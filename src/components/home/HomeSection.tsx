import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bannerSlides = [
  {
    id: 1,
    title: 'Discover Your Next Favorite Book',
    subtitle: 'Explore thousands of titles across all genres',
    gradient: 'bg-gradient-to-br from-[#fc2403] via-[#fc6603] to-[#ff8a50]',
  },
  {
    id: 2,
    title: 'Best Sellers & New Releases',
    subtitle: 'Find the books everyone is talking about',
    gradient: 'bg-gradient-to-br from-[#ff8a50] via-[#fc6603] to-[#fc2403]',
  },
  {
    id: 3,
    title: 'Books That Inspire & Transform',
    subtitle: 'Your journey to knowledge starts here',
    gradient: 'bg-gradient-to-br from-[#fc6603] via-[#ff8a50] to-[#fc2403]',
  },
];

const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='home-section-2 home-section-bg pt-4 md:!pt-0 rounded-t-xl !shadow-muted overflow-x-hidden'>
      <div className='relative container-fluid p-0 ratio_27'>
        <div className='row'>
          <div className='col-12'>
            <div className='slider-animate skeleton-banner-xl'>
              <div className='relative !h-60 md:!h-80 overflow-hidden'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className={`absolute inset-0 ${bannerSlides[currentSlide].gradient} rounded-t-xl`}
                  >
                    <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className='text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg'
                      >
                        {bannerSlides[currentSlide].title}
                      </motion.h1>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className='text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md'
                      >
                        {bannerSlides[currentSlide].subtitle}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
                  {bannerSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
                    )
                  }
                  className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200'
                  aria-label='Previous slide'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200'
                  aria-label='Next slide'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
