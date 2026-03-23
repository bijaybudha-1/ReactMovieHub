import { Link } from "react-router-dom";
import { DiscordAlt, Github, Instagram, Linkedin } from "@boxicons/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border-color pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link
              to="/home"
              className="text-2xl font-extrabold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent hover:opacity-85 transition-opacity inline-block mb-4 w-fit tracking-tight"
            >
              MovieHub
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[280px]">
              Your ultimate destination for discovering movies, TV shows, and
              entertainment. Powered by TMDB.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                to="https://www.linkedin.com/in/bijay-budha/"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-glass-bg border border-border-color text-text-secondary text-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-glow transition-all duration-250"
              >
                <Linkedin />
              </Link>
              <Link
                to="https://www.instagram.com/dev_loper.bijay"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-glass-bg border border-border-color text-text-secondary text-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-glow transition-all duration-250"
              >
                <Instagram />
              </Link>
              <Link
                to="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-glass-bg border border-border-color text-text-secondary text-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-glow transition-all duration-250"
              >
                <DiscordAlt />
              </Link>
              <Link
                to="https://github.com/bijaybudha-1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-glass-bg border border-border-color text-text-secondary text-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-glow transition-all duration-250"
              >
                <Github />
              </Link>
            </div>
          </div>

          {/* Nav Col */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-6">
              Navigation
            </h4>
            <Link
              to="/"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Movies
            </Link>
            <Link
              to="/tv"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              TV Shows
            </Link>
            <Link
              to="/news"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Latest News
            </Link>
            <Link
              to="/contact"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Info Col */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-6">
              Information
            </h4>
            <Link
              to="/about"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              About MovieHub
            </Link>
            <Link
              to="/faq"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              FAQ
            </Link>
            <Link
              to="/reviews"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Community Reviews
            </Link>
            <Link
              to="/ratings"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Global Ratings
            </Link>
          </div>

          {/* Explore Col */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-6">
              Explore
            </h4>
            <Link
              to="/profile"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Your Profile
            </Link>
            <Link
              to="/favorites"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Your Watchlist
            </Link>
            <Link
              to="/movies"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Top Rated Films
            </Link>
            <Link
              to="/tv"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Popular Shows
            </Link>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-6">
              Legal
            </h4>
            <Link
              to="/terms"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              Cookie Policy
            </Link>
            <Link
              to="/dmca"
              className="text-sm text-text-secondary py-1 hover:text-primary hover:translate-x-1 transition-all duration-200"
            >
              DMCA Notice
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-border-color flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} MovieHub. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Developed by{" "}
            <Link
              to={"https://github.com/bijaybudha-1"}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              Bijay Budha
            </Link>{" "}
            &bull; Powered by{" "}
            <Link
              to={"https://www.themoviedb.org/"}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              TMDB
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
