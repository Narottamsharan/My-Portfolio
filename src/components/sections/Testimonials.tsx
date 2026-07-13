import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/src/data';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = TESTIMONIALS.length - 1;
      if (nextIndex >= TESTIMONIALS.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4">Client Feedback</h2>
          <p className="text-xl text-text-secondary font-light">The impact of strategic editing.</p>
        </div>
        
        <div className="hidden sm:flex gap-4">
          <button 
            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative h-[550px] sm:h-[450px] w-full max-w-4xl mx-auto flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full px-4"
          >
            <div className="flex flex-col items-center text-center bg-surface-1 border border-border-subtle p-8 md:p-14 rounded-3xl w-full mx-auto shadow-sm">
              <div className="flex items-center gap-1 mb-8">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-heading font-medium leading-tight mb-10 text-text-primary">
                "{TESTIMONIALS[currentIndex].testimonial}"
              </p>
              <div className="flex flex-col items-center gap-4">
                <span className="px-3 py-1 rounded-full border border-border-medium bg-surface-2 text-xs font-mono text-text-secondary uppercase tracking-wider">
                  {TESTIMONIALS[currentIndex].tag}
                </span>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <span className="font-medium text-lg text-text-primary">{TESTIMONIALS[currentIndex].name}</span>
                  <span className="text-sm font-mono text-text-secondary uppercase tracking-wider">
                    {TESTIMONIALS[currentIndex].role}, {TESTIMONIALS[currentIndex].company}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Pagination Controls */}
      <div className="flex justify-center sm:hidden gap-4 mt-8">
        <button 
          className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
