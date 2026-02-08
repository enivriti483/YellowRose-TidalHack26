
export interface MaterialInfo {
  name: string;
  percentage: number;
  type: 'organic' | 'synthetic' | 'natural' | 'recycled';
  disposalGuide: string;
}

export interface AuditResult {
  brandName: string;
  productName: string;
  imageUrl: string;
  imageCandidates: string[]; // List of alternative URLs to try if primary fails
  score: number; // 1-10
  materials: MaterialInfo[];
  laborRating: number; // 1-100
  carbonRating: number; // 1-100
  waterUsageLiters: number;
  co2kg: number;
  certifications: string[];
  longevity: 'Short' | 'Mid' | 'High';
  recyclable: boolean;
  alternativeSearchQuery: string;
  brandSustainabilityRating: string;
  totalDisposalVerdict: string;
}
