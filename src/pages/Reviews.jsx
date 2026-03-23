import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTrending, getImageUrl } from '../utils/tmdb';
import { Link } from 'react-router-dom';

export default function Reviews() {
  const { userReviews, addReview, showToast } = useAppContext();
  const [formData, setFormData] = useState({ title: '', text: '', rating: 10 });
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      const data = await getTrending('movie', 'week');
      if (data && data.results) {
        setTopMovies(data.results.slice(0, 10));
      }
      setIsLoading(false);
    };
    fetchTop();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.text) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    addReview(formData);
    setFormData({ title: '', text: '', rating: 10 });
  };

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <section className="bg-bg-secondary border-b border-border-color pt-20 pb-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[3px] px-3 py-1 rounded-full mb-6">
            Community Voice
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Critic & User Reviews</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Share your perspective and join the global conversation about modern cinema.
          </p>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-bg-card border border-border-color rounded-2xl p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <i className="bx bx-edit-alt text-primary"></i> Write a Review
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Movie / TV Show Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                  placeholder="e.g. The Dark Knight"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary block">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, rating: num})}
                      className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${formData.rating >= num ? 'bg-primary text-white scale-110 shadow-glow' : 'bg-bg-secondary text-text-muted border border-border-color hover:border-primary'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Your Review</label>
                <textarea 
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm min-h-[150px] resize-none"
                  placeholder="Share your thoughts about the movie..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full md:w-auto">
                <i className="bx bx-send mr-2"></i> Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary py-16 border-y border-border-color">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Your Reviews
            </h2>
            <div className="text-sm text-text-muted font-mono">{userReviews.length} TOTAL</div>
          </div>
          
          {userReviews.length === 0 ? (
            <div className="bg-bg-card border border-dashed border-border-color rounded-2xl py-20 text-center">
              <i className="bx bx-message-square-detail text-5xl text-text-muted mb-4 opacity-20"></i>
              <p className="text-text-muted">You haven't written any reviews yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userReviews.map((review) => (
                <div key={review.id} className="bg-bg-card border border-border-color rounded-xl p-6 hover:shadow-lg transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {review.rating}/10
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 pr-12">{review.title}</h3>
                  <div className="text-[10px] text-text-muted uppercase tracking-widest mb-4">{review.date}</div>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-4 italic border-l-2 border-primary/20 pl-4">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent"></span> Highly Reviewed Movies
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[160px] h-[240px] bg-bg-card animate-pulse rounded-xl border border-border-color"></div>
            ))
          ) : (
            topMovies.map((movie) => (
              <Link 
                key={movie.id} 
                to={`/movie/${movie.id}`} 
                className="min-w-[160px] group snap-start"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-border-color group-hover:border-primary transition-all shadow-lg">
                  <img 
                    src={getImageUrl(movie.poster_path)} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-rating-high flex items-center gap-1">
                    <i className="bx bxs-star"></i> {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <h4 className="mt-3 text-xs font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h4>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="bg-bg-secondary py-16 border-t border-border-color">
        <div className="container-custom">
           <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Your Stats</h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-bg-card border border-border-color rounded-xl p-8">
                  <div className="text-primary text-4xl font-black mb-2">{userReviews.length}</div>
                  <div className="text-text-muted text-xs uppercase tracking-widest">Reviews Written</div>
                </div>
                <div className="bg-bg-card border border-border-color rounded-xl p-8">
                  <div className="text-accent text-4xl font-black mb-2">
                    {userReviews.length > 0 
                      ? (userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length).toFixed(1)
                      : '0.0'}
                  </div>
                  <div className="text-text-muted text-xs uppercase tracking-widest">Avg Rating Given</div>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
