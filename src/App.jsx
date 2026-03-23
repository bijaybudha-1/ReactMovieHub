import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ToastContainer from "./components/Toast";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import News from "./pages/News";
import Reviews from "./pages/Reviews";
import Ratings from "./pages/Ratings";
import NotFound from "./pages/NotFound";
import { Privacy, Terms, CookiePolicy, DMCA } from "./pages/Legal";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/movie/:id"
            element={<MovieDetail mediaType="movie" />}
          />
          <Route path="/tv/:id" element={<MovieDetail mediaType="tv" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie" element={<CookiePolicy />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/news" element={<News />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
}

export default App;
