import { useRef, useState, useEffect } from 'react';

export default function HScrollSection({ children }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  const scroll = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/hscroll">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-300)}
          className="absolute left-[-22px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-glass-bg backdrop-blur-md border border-glass-border text-text-primary flex items-center justify-center cursor-pointer z-10 transition-all opacity-0 group-hover/hscroll:opacity-100 dark:text-white hover:bg-primary hover:border-primary hover:text-white hover:scale-110 hidden md:flex"
        >
          <i className="bx bx-chevron-left text-2xl"></i>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto py-4 px-1 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll(300)}
          className="absolute right-[-22px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-glass-bg backdrop-blur-md border border-glass-border text-text-primary flex items-center justify-center cursor-pointer z-10 transition-all opacity-0 group-hover/hscroll:opacity-100 dark:text-white hover:bg-primary hover:border-primary hover:text-white hover:scale-110 hidden md:flex"
        >
          <i className="bx bx-chevron-right text-2xl"></i>
        </button>
      )}
    </div>
  );
}
