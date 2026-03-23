import { useEffect } from 'react';

export default function MovieModal({ isOpen, onClose, videoKey }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center transition-opacity duration-300 pointer-events-auto opacity-100"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[1000px] aspect-video bg-black rounded-lg shadow-xl scale-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary z-50 transition-colors"
        >
          <i className="bx bx-x text-2xl"></i>
        </button>
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Trailer"
            className="w-full h-full border-none"
            allowFullScreen
            allow="autoplay; encrypted-media"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <p>Trailer not available</p>
          </div>
        )}
      </div>
    </div>
  );
}
