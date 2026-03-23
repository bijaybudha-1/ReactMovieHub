import { Link } from 'react-router-dom';

export default function News() {
  const newsItems = [
    {
      id: 1,
      category: "CINEMA NEWS",
      title: "Marvel Studios Announces 'The Next Era' of the MCU",
      excerpt: "A deep dive into the upcoming phases of the Marvel Cinematic Universe and what fans can expect from the next decade of superhero storytelling.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
      tag: "Exclusive"
    },
    {
      id: 2,
      category: "AWARDS",
      title: "Oscars 2026: Predictions and Frontrunners",
      excerpt: "With the award season approaching, we analyze the top contenders for Best Picture and Best Director in a year filled with cinematic masterpieces.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
      tag: "Trending"
    },
    {
      id: 3,
      category: "INDUSTRY",
      title: "Streaming Wars: The Rise of Global Cinema",
      excerpt: "How international content is dominating streaming platforms and changing the way global audiences consume entertainment in 2026.",
      image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      category: "CELEBRITY",
      title: "Actor Spotlight: The Journey of a Rising Star",
      excerpt: "An exclusive interview with the year's breakout talent about their preparation, challenges, and upcoming blockbuster projects.",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      category: "FESTIVALS",
      title: "Cannes 2026: A Celebration of Independent Film",
      excerpt: "Highlights from this year's festival, showcasing the most innovative and thought-provoking independent cinema from across the world.",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      category: "TECH",
      title: "The Future of VFX: AI in Modern Filmmaking",
      excerpt: "How artificial intelligence is revolutionizing visual effects and streamlining production pipelines for the next generation of cinema.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <section className="bg-bg-secondary border-b border-border-color pt-20 pb-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[3px] px-3 py-1 rounded-full mb-6">
            MovieHub News
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Cinematic Headlines</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest leaks, awards, and industry breakthroughs.
          </p>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-bg-card border border-border-color rounded-xl overflow-hidden group hover:border-primary transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {item.tag && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {item.tag}
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2 block">{item.category}</span>
                <h3 className="text-lg font-bold mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link to="#" className="text-sm font-bold text-text-primary flex items-center gap-2 group/link">
                    Read Full Story 
                    <i className="bx bx-right-arrow-alt text-lg text-primary transition-transform group-hover/link:translate-x-1"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-bg-secondary py-20 border-y border-border-color">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Upcoming Events
            </h2>
            <p className="text-text-secondary">Mark your calendars for these cinematic milestones</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bg-card border border-border-color rounded-xl p-8 text-center hover:shadow-glow transition-all">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto mb-6">
                <i className="bx bx-calendar-star"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Sundance Festival</h3>
              <p className="text-text-muted text-sm uppercase tracking-widest">Jan 22 - Feb 1, 2026</p>
            </div>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 text-center hover:shadow-glow transition-all">
              <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center text-3xl mx-auto mb-6">
                <i className="bx bx-trophy"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Academy Awards</h3>
              <p className="text-text-muted text-sm uppercase tracking-widest">March 2, 2026</p>
            </div>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 text-center hover:shadow-glow transition-all">
              <div className="w-16 h-16 rounded-full bg-rating-high/10 text-rating-high flex items-center justify-center text-3xl mx-auto mb-6">
                <i className="bx bx-camera-movie"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Cannes Film Festival</h3>
              <p className="text-text-muted text-sm uppercase tracking-widest">May 12 - 23, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="bg-bg-card border border-border-color rounded-2xl p-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-text-secondary leading-relaxed max-w-lg">
              Get the latest movie leaks, casting news, and exclusive previews sent directly to your inbox every Friday.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md">
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">Join Now</button>
            </form>
            <p className="text-[10px] text-text-muted mt-3 uppercase tracking-tighter">No spam, just pure entertainment. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
