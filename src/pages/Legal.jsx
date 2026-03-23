import { Link } from 'react-router-dom';

function LegalLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      {/* Modern Cinematic Hero */}
      <section className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
            <i className="bx bx-shield-quarter text-xs"></i>
            Legal Document
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none animate-fade-in">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-primary' : 'text-text-primary'}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed opacity-80">
            {subtitle}
          </p>
          {lastUpdated && (
            <div className="mt-10 flex items-center justify-center gap-2 text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="w-8 h-[1px] bg-border-color"></span>
              Last Updated: {lastUpdated}
              <span className="w-8 h-[1px] bg-border-color"></span>
            </div>
          )}
        </div>
      </section>
      
      {/* Glassmorphic content section */}
      <section className="py-24 relative">
         <div className="max-w-[900px] mx-auto px-6">
            <div className="bg-bg-card/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-16 shadow-2xl relative group overflow-hidden transition-all duration-500 hover:border-primary/20">
               {/* Decorative elements */}
               <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               <div className="relative space-y-16">
                  {children}
               </div>

               {/* Modern Footer Nav */}
               <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex flex-col gap-2">
                    <span className="text-text-muted text-[10px] uppercase tracking-widest font-bold opacity-60">Still have questions?</span>
                    <Link to="/contact" className="text-sm font-bold text-primary hover:text-primary-light transition-all flex items-center gap-2 group/link">
                       Get in touch 
                       <i className="bx bx-right-arrow-alt transition-transform group-hover/link:translate-x-1"></i>
                    </Link>
                 </div>
                 
                 <Link to="/" className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold text-text-secondary hover:text-text-primary">
                    <i className="bx bx-home-alt text-lg"></i> Back to Home
                 </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout 
      title="Privacy Policy" 
      subtitle="Your privacy is my priority. Transparency is at the heart of our platform's design." 
      lastUpdated="March 2026"
    >
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-2">Section 01</div>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">Information Collection</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90">
          MovieHub is designed as a client-side first application. We do not collect, store, or process your personal data on any centralized servers. Any information you provide—such as your watchlist, movie favorites, or rating history—is stored exclusively within your browser's <span className="text-text-primary font-bold">LocalStorage</span>.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-2">Section 02</div>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">Data Sovereignty</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90">
          The data residing in your LocalStorage is used solely to enable personalized platform features. This allows you to maintain a persistent state across sessions without the need for a traditional account system. We have no technical means to access or monetize your local data.
        </p>
      </div>

      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-2">Section 03</div>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">API Integrations</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90 font-medium">
          We utilize the TMDB API to provide cinematic metadata. Interaction data is governed by the 
          <a href="https://www.themoviedb.org/privacy-policy" target="_blank" className="text-primary hover:text-primary-light transition-colors underline underline-offset-4 ml-1">
             TMDB Privacy Policy
          </a>
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
         <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
            <i className="bx bx-info-circle"></i> Note on LocalStorage
         </h4>
         <p className="text-sm text-text-secondary leading-relaxed">
            Clearing your browser cache or site data will reset your theme preferences and interaction history. This data is not recoverable if cleared.
         </p>
      </div>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout 
      title="Terms of Service" 
      subtitle="Ensuring a fair and seamless experience for movie enthusiasts worldwide."
      lastUpdated="March 15, 2026"
    >
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-2">01. Acceptance</div>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">Agreement to Terms</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90">
          By accessing MovieHub, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </div>

      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-2">02. Licensing</div>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">Use License</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90">
          Permission is granted to use the platform for personal, non-commercial transitory viewing only. This platform is an educational exploration for cinema lovers.
        </p>
      </div>

      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-2">03. Disclaimer</div>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">Warranties</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90 italic">
          MovieHub is provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the continuous availability of the TMDB API or other external dependencies.
        </p>
      </div>
    </LegalLayout>
  );
}

export function CookiePolicy() {
  return (
    <LegalLayout 
      title="Cookie Policy" 
      subtitle="How we leverage modern browser technology for a smoother experience."
      lastUpdated="March 2026"
    >
      <div className="space-y-8">
        <div className="space-y-4">
           <h3 className="text-3xl font-black text-text-primary tracking-tight">Modern Storage</h3>
           <p className="text-text-secondary leading-relaxed text-lg opacity-90">
             We do not use tracking cookies. Instead, we use <span className="text-primary font-bold">LocalStorage</span> to remember your settings.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
              <i className="bx bx-moon text-primary text-2xl mb-4"></i>
              <h4 className="font-bold text-text-primary mb-2">Preferences</h4>
              <p className="text-sm text-text-muted">Storing your choice between Dark and Light mode themes.</p>
           </div>
           <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
              <i className="bx bx-list-check text-primary text-2xl mb-4"></i>
              <h4 className="font-bold text-text-primary mb-2">Interaction</h4>
              <p className="text-sm text-text-muted">Keeping track of your personalized Watchlist and Favorites.</p>
           </div>
        </div>
      </div>
    </LegalLayout>
  );
}

export function DMCA() {
  return (
    <LegalLayout 
      title="DMCA Notice" 
      subtitle="Honoring copyright and intellectual property in the cinematic world."
      lastUpdated="January 2026"
    >
      <div className="space-y-6">
        <h3 className="text-3xl font-black text-text-primary tracking-tight">Copyright Policy</h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90">
          MovieHub is a metadata aggregator. We do not host, store, or distribute any copyrighted media content. All assets are served directly from official TMDB or YouTube endpoints.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">!</span>
          Reporting Infringement
        </h3>
        <p className="text-text-secondary leading-relaxed text-lg opacity-90">
           Submit notices to: <span className="text-primary font-black underline underline-offset-8">bijay.budhasp25@cps.edu.np</span>
        </p>
      </div>
    </LegalLayout>
  );
}
