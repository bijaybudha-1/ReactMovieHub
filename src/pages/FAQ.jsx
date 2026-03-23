import { useState } from 'react';

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqData = [
    {
      category: "General Questions",
      icon: "bx-info-circle",
      items: [
        {
          id: 1,
          question: "What is MovieHub?",
          answer: "MovieHub is a premium film information system that allows users to discover movies, TV shows, trailers, and cast metadata. It integrates real-time data from the TMDB database to provide the most up-to-date entertainment information."
        },
        {
          id: 2,
          question: "Is MovieHub free to use?",
          answer: "Yes, MovieHub is completely free for exploratory and academic purposes. You can browse all movies, watch trailers, and manage your watchlist without any subscription fee."
        }
      ]
    },
    {
      category: "Account & Watchlist",
      icon: "bx-user",
      items: [
        {
          id: 3,
          question: "How do I add movies to my watchlist?",
          answer: "Simply hover over any movie card and click the bookmark icon, or go to the movie's detail page and click the 'Add to Watchlist' button."
        },
        {
          id: 4,
          question: "Is my data saved permanently?",
          answer: "Your data (watchlist, ratings, favorites) is saved in your browser's LocalStorage. This means it will persist even if you close the browser, but it won't be available if you use a different device or clear your browser data."
        }
      ]
    },
    {
      category: "Technical Details",
      icon: "bx-cog",
      items: [
        {
          id: 5,
          question: "Where does the movie data come from?",
          answer: "MovieHub is powered by the TMDB (The Movie Database) API. It fetches real-time metadata including posters, backdrops, cast information, and trailers directly from their global servers."
        },
        {
          id: 6,
          question: "What technologies are used to build MovieHub?",
          answer: "This version of MovieHub is built using React.js with Vite, Tailwind CSS v4, and React Router v6. It's designed to be modern, fast, and responsive."
        }
      ]
    }
  ];

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <section className="bg-bg-secondary border-b border-border-color pt-20 pb-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[3px] px-3 py-1 rounded-full mb-6">
            Help Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Frequently Asked Questions</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the MovieHub platform and community.
          </p>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqData.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-text-primary">
                <i className={`bx ${cat.icon} text-primary text-2xl`}></i>
                {cat.category}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-bg-card border rounded-xl overflow-hidden transition-all duration-300 ${activeId === item.id ? 'border-primary ring-1 ring-primary/20' : 'border-border-color hover:border-text-muted'}`}
                  >
                    <button 
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-text-primary"
                    >
                      <span>{item.question}</span>
                      <i className={`bx bx-chevron-down text-2xl transition-transform duration-300 ${activeId === item.id ? 'rotate-180 text-primary' : ''}`}></i>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out ${activeId === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                    >
                      <div className="p-5 pt-0 text-text-secondary leading-relaxed border-t border-border-color/50">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-secondary py-20 border-y border-border-color">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Technical Support
            </h2>
            <p className="text-text-secondary">Need more help? Our team is here for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bg-card border border-border-color rounded-xl p-8 text-center hover:border-primary transition-all group">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <i className="bx bx-envelope"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-text-muted text-sm tracking-wide">support@moviehub.com</p>
            </div>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 text-center hover:border-accent transition-all group">
              <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <i className="bx bx-chat"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-text-muted text-sm tracking-wide">Available Mon-Fri</p>
            </div>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 text-center hover:border-rating-high transition-all group">
              <div className="w-16 h-16 rounded-full bg-rating-high/10 text-rating-high flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-rating-high group-hover:text-white transition-colors">
                <i className="bx bx-book-content"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Documentation</h3>
              <p className="text-text-muted text-sm tracking-wide">API & Dev Guides</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Community Guidelines
            </h3>
            <p className="text-text-secondary leading-relaxed">
              To maintain a positive environment, we ask all MovieHub users to be respectful in their reviews and ratings. Avoid spoilers in titles, respect diverse opinions, and report any inappropriate content.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Data Accuracy
            </h3>
            <p className="text-text-secondary leading-relaxed">
              While we strive for 100% accuracy, movie data can change. If you spot a mistake in a release date or cast list, please let us know via the contact form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
