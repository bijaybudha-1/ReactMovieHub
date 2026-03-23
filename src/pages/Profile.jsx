import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { theme, watchlist, favorites } = useAppContext();

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="bg-bg-secondary border-b border-border-color pt-16 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden shadow-glow">
            <img 
              src="https://ui-avatars.com/api/?name=User&background=e50914&color=fff&size=128" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold mb-2">Movie Enthusiast</h1>
            <p className="text-lg text-text-secondary">Member since March 2026</p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="bg-bg-card border border-border-color rounded-xl p-6 flex flex-col items-center text-center hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mb-4">
              <i className="bx bx-bookmark"></i>
            </div>
            <h3 className="text-3xl font-bold mb-1">{watchlist.length}</h3>
            <p className="text-text-muted text-sm">Movies in Watchlist</p>
            <Link to="/favorites" className="mt-4 text-xs font-bold text-primary uppercase tracking-widest hover:text-primary-light">View All</Link>
          </div>

          <div className="bg-bg-card border border-border-color rounded-xl p-6 flex flex-col items-center text-center hover:border-accent transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-2xl mb-4">
              <i className="bx bx-heart"></i>
            </div>
            <h3 className="text-3xl font-bold mb-1">{favorites.length}</h3>
            <p className="text-text-muted text-sm">Favorite Titles</p>
            <Link to="/favorites" className="mt-4 text-xs font-bold text-accent uppercase tracking-widest hover:text-accent-light">View All</Link>
          </div>

          <div className="bg-bg-card border border-border-color rounded-xl p-6 flex flex-col items-center text-center hover:border-rating-high transition-colors">
            <div className="w-12 h-12 rounded-full bg-rating-high/10 text-rating-high flex items-center justify-center text-2xl mb-4">
              <i className="bx bx-star"></i>
            </div>
            <h3 className="text-3xl font-bold mb-1">{watchlist.length + favorites.length}</h3>
            <p className="text-text-muted text-sm">Total Interactions</p>
            <span className="mt-4 text-xs font-bold text-text-muted uppercase tracking-widest">Active Member</span>
          </div>
        </div>

        <div className="mt-12 bg-bg-card border border-border-color rounded-xl p-8 max-w-2xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="bx bx-cog text-primary"></i> Account Settings
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-secondary">Username</label>
              <input 
                type="text" 
                defaultValue="MovieEnthusiast" 
                disabled 
                className="bg-bg-input border border-border-color rounded-md px-4 py-3 text-text-primary text-sm outline-none opacity-70 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-secondary">Email</label>
              <input 
                type="text" 
                defaultValue="user@example.com" 
                disabled 
                className="bg-bg-input border border-border-color rounded-md px-4 py-3 text-text-primary text-sm outline-none opacity-70 cursor-not-allowed"
              />
            </div>
            <div className="pt-4 border-t border-border-color flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Current Theme</h4>
                <p className="text-xs text-text-muted capitalize">{theme} Mode</p>
              </div>
              <Link to="/" className="btn btn-outline btn-sm">Sign Out</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
