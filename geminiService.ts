
import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult } from "../types";

export class GeminiService {
  async auditProduct(url: string): Promise<AuditResult> {
    const prompt = `
      Perform a high-precision, deep-dive sustainability audit for this fashion product: ${url}
      
      DILIGENCE REQUIREMENTS (CRITICAL):
      1. MATERIALS: You must be extremely precise. Extract the exact material percentages listed on the product page. The percentages MUST sum to exactly 100%. If certain materials are listed without percentages, provide your most accurate expert estimate.
      2. SCORING LOGIC (INVERSE RELATIONSHIP): 
         - "score" (1-10): Overall sustainability grade (10 is perfect, 1 is terrible).
         - "carbonRating" (0-100): NEGATIVE EARTH IMPACT. A high score (e.g. 90%) means the product is VERY DAMAGING to the environment.
         - "laborRating" (0-100): LABOR KINDNESS. A high score (e.g. 90%) means workers were treated VERY WELL.
         - If overall "score" is LOW (e.g. 2/10), "carbonRating" (Earth Impact) must be HIGH (e.g. 80-95%) and "laborRating" (Labor Kindness) must be LOW (e.g. 5-20%).
      
      IMAGE RETRIEVAL:
      - Use googleSearch to find a high-res direct image asset for the specific product.
      - Return a list of direct image URLs in "imageCandidates".
      
      JSON RESPONSE FORMAT:
      {
        "brandName": "string",
        "productName": "string",
        "imageUrl": "string",
        "imageCandidates": ["string"],
        "score": number (1-10),
        "materials": [
          {
            "name": "string", 
            "percentage": number, 
            "type": "organic|synthetic|natural|recycled", 
            "disposalGuide": "Detailed disposal explanation (max 50 words)."
          }
        ],
        "laborRating": number (0-100 - High is Good),
        "carbonRating": number (0-100 - High is Bad),
        "waterUsageLiters": number,
        "co2kg": number,
        "certifications": ["string"],
        "longevity": "Short|Mid|High",
        "recyclable": boolean,
        "alternativeSearchQuery": "string",
        "brandSustainabilityRating": "2-3 word label",
        "totalDisposalVerdict": "Summary of how to manage the garment at end-of-life."
      }
    `;

    try {
      const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse audit data");
      
      const data = JSON.parse(jsonMatch[0]) as AuditResult;
      
      // Safety check: ensure percentages sum to 100 or close
      const sum = data.materials.reduce((acc, m) => acc + m.percentage, 0);
      if (sum !== 100 && data.materials.length > 0) {
        // Normalize if slightly off
        data.materials = data.materials.map(m => ({
          ...m,
          percentage: Math.round((m.percentage / sum) * 100)
        }));
      }
      
      if (!data.imageCandidates) data.imageCandidates = [];
      if (data.imageUrl && !data.imageCandidates.includes(data.imageUrl)) {
        data.imageCandidates.unshift(data.imageUrl);
      }
      
      return data;
    } catch (error) {
      console.error("Audit failed:", error);
      throw error;
    }
  }
}

export const gemini = new GeminiService();
