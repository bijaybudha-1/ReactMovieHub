import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    {
      icon: "bx-film",
      count: "950K+",
      label: "Movies Indexed",
      color: "text-primary",
    },
    {
      icon: "bx-tv",
      count: "210K+",
      label: "TV Series",
      color: "text-blue-500",
    },
    {
      icon: "bx-group",
      count: "2.8M+",
      label: "Cast & Crew",
      color: "text-emerald-500",
    },
    {
      icon: "bx-bolt-circle",
      count: "100%",
      label: "React Powered",
      color: "text-amber-500",
    },
  ];

  const values = [
    {
      icon: "bx-check-shield",
      title: "Reliability",
      desc: "Providing accurate and timely movie metadata through the world-class TMDB API.",
    },
    {
      icon: "bx-palette",
      title: "Creativity",
      desc: "Designing immersive, cinematic interfaces that inspire wonder in every pixel.",
    },
    {
      icon: "bx-globe",
      title: "Globalism",
      desc: "Celebrating diverse stories from every corner of the world, for every audience.",
    },
    {
      icon: "bx-user-voice",
      title: "Community",
      desc: "Listening to our users to build a platform that evolves with the movie industry.",
    },
  ];

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
            alt="Cinema"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text text-transparent">
              CINEMA AT YOUR <br />
              <span className="text-primary italic">FINGERTIPS.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
              MovieHub is more than just a database. It's a cinematic journey,
              connecting enthusiasts with the heart of global entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="container-custom -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center hover:shadow-glow transition-all duration-500 hover:-translate-y-2 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-primary/10 transition-colors ${s.color}`}
              >
                <i className={`bx ${s.icon}`}></i>
              </div>
              <div className="text-4xl font-black mb-1 text-text-primary tracking-tight">
                {s.count}
              </div>
              <div className="text-text-muted text-[10px] uppercase font-bold tracking-widest opacity-60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Missions & Content */}
      <section className="py-20 bg-bg-secondary border-y border-border-color">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="w-10 h-1 bg-primary rounded-full"></span>
                  Our Mission
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  To provide a seamless, premium, and data-rich environment
                  where cinephiles can explore, rate, and track films from
                  across the globe with zero friction.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="w-10 h-1 bg-primary rounded-full"></span>
                  The Technical Edge
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  By leveraging the power of React and the TMDB API, we've built
                  a platform that combines technical excellence with aesthetic
                  beauty, ensuring that the magic of cinema begins before you
                  even press play.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative rounded-[40px] overflow-hidden aspect-video border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop"
                  alt="Production"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tight">
              CRAFTED WITH CARE
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              The principles that drive the development of the MovieHub
              ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-bg-card p-10 rounded-3xl border border-border-color hover:border-primary/30 transition-all hover:bg-glass-bg-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                  <i className={`bx ${v.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solo Developer Spotlight */}
      <section className="container-custom py-32 border-t border-border-color">
        <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-[48px] p-12 md:p-20 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative mx-auto lg:mx-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[48px] overflow-hidden border-2 border-primary/20 shadow-2xl transition-transform duration-700">
                <img
                  src="/bijay.jpg"
                  alt="Bijay Budha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8 text-center lg:text-left">
              <div>
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                  Meet the Developer
                </span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                  Bijay Budha
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed italic opacity-80">
                  "Solo developer passionate about creating cinematic and
                  highly-polished web applications that bridge the gap between
                  technical complexity and artistic beauty."
                </p>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <a
                  href="https://github.com/bijaybudha-1"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary transition-all group/link"
                >
                  <i className="bx bxl-github text-2xl"></i>
                  <span className="font-bold text-sm">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/bijay-budha/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary transition-all group/link"
                >
                  <i className="bx bxl-linkedin text-2xl"></i>
                  <span className="font-bold text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TMDB attribution */}
      <section className="container-custom py-20 text-center opacity-40 hover:opacity-80 transition-opacity">
        <img
          src="/TMDB logo images.svg"
          alt="TMDB Logo"
          className="w-24 mx-auto mb-6"
        />
        <p className="text-xs text-text-muted italic max-w-sm mx-auto leading-relaxed">
          MovieHub uses the TMDB API but is not endorsed or certified by TMDB.
          All movie images and data are properties of their respective owners.
        </p>
      </section>
    </div>
  );
}
