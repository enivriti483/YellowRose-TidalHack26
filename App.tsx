
import React, { useState } from 'react';
import Logo from './components/Logo';
import AuditDashboard from './components/AuditDashboard';
import OurGoal from './components/OurGoal';
import { gemini } from './services/geminiService';
import { AuditResult } from './types';

type Page = 'audit' | 'goal';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('audit');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanUrlDisplay = (rawUrl: string) => {
    try {
      const urlObj = new URL(rawUrl);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const auditData = await gemini.auditProduct(url);
      setResult(auditData);
    } catch (err) {
      setError('Audit failure. Try a new URL! 🌸');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Top Nav */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full apple-shadow z-[100] border border-white/50">
        <button 
          onClick={() => setActivePage('audit')}
          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activePage === 'audit' ? 'bg-amber-400 text-white shadow-lg shadow-amber-100' : 'text-gray-400 hover:text-amber-500'}`}
        >
          Auditor
        </button>
        <button 
          onClick={() => setActivePage('goal')}
          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activePage === 'goal' ? 'bg-amber-400 text-white shadow-lg shadow-amber-100' : 'text-gray-400 hover:text-amber-500'}`}
        >
          Our Goal
        </button>
      </nav>

      {activePage === 'audit' ? (
        <>
          <header className="pt-32 pb-12">
            <Logo />
          </header>

          <main className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.5em]">Audit any link</p>
            </div>

            <form onSubmit={handleAudit} className="relative group max-w-2xl mx-auto mb-16">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste link here..."
                className="w-full px-10 py-7 rounded-[40px] bg-white apple-shadow text-gray-800 placeholder-gray-200 focus:outline-none focus:ring-8 focus:ring-amber-100/20 transition-all text-sm font-bold pr-40 border-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-3 bottom-3 px-10 bg-amber-400 text-white rounded-[32px] text-xs font-black uppercase tracking-widest disabled:opacity-50 hover:bg-amber-500 transition-all shadow-xl shadow-amber-100 active:scale-95"
              >
                {loading ? '...' : 'Analyze'}
              </button>
              
              {url && !loading && (
                <div className="absolute top-full left-10 mt-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <div className="text-[9px] font-black text-amber-500/50 uppercase tracking-[0.3em]">
                    Scanning {cleanUrlDisplay(url)}
                  </div>
                </div>
              )}
            </form>

            {loading && (
              <div className="mt-40 flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 border-[12px] border-amber-50 rounded-full"></div>
                  <div className="absolute inset-0 border-[12px] border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">🌻</div>
                </div>
                <p className="mt-10 text-[11px] font-black text-amber-300 uppercase tracking-[0.6em]"> Harvesting Data</p>
              </div>
            )}

            {error && (
              <div className="mt-12 p-10 bg-white/50 border-2 border-dashed border-rose-100 text-rose-400 text-center rounded-[40px] text-[10px] font-black uppercase tracking-widest apple-shadow">
                {error}
              </div>
            )}

            {result && <AuditDashboard result={result} />}
          </main>
        </>
      ) : (
        <div className="pt-32">
          <OurGoal onStartAudit={() => setActivePage('audit')} />
        </div>
      )}
    </div>
  );
};

export default App;
