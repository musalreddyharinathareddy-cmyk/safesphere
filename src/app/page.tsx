export default function Home() { 
  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050814] text-white"> 
      <h1 className="text-4xl font-black uppercase tracking-widest text-white/80 mb-4">Project Sentinel Running</h1> 
      <p className="text-sm font-mono text-white/40 mb-8">System Initialized & Deploy-Ready</p>
      <a 
        href="/sentinel" 
        className="px-6 py-3 bg-[#1a237e] hover:bg-[#1a237e]/80 border border-[#1a237e]/40 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
      >
        Enter Security Dashboard
      </a>
    </div> 
  ); 
} 
