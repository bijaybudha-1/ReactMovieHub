import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 pt-32 pb-20">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="bx bx-movie-play text-6xl md:text-8xl text-primary animate-pulse"></i>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
          Lost in the Cinematic Void?
        </h2>
        
        <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
          The page you're searching for seems to have been cut from the final edit. 
          Don't worry, even the best blockbusters have deleted scenes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/home"
            className="btn btn-primary px-10 py-4 rounded-full font-bold shadow-glow flex items-center gap-2 transition-transform hover:-translate-y-1 active:scale-95"
          >
            <i className="bx bx-home-alt text-xl"></i>
            Take Me Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-10 py-4 rounded-full font-bold text-text-primary border border-border-color bg-glass-bg hover:bg-glass-bg-hover transition-all flex items-center gap-2 hover:-translate-y-1 active:scale-95"
          >
            <i className="bx bx-left-arrow-alt text-xl"></i>
            Go Back
          </button>
        </div>

        <div className="mt-16 pt-10 border-t border-border-color max-w-xs mx-auto opacity-40">
           <p className="text-[10px] uppercase tracking-[3px] font-bold text-text-muted">
             MovieHub &bull; Error Protocol
           </p>
        </div>
      </div>
    </div>
  );
}
