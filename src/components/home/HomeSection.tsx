import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getActiveSliders, type Slider } from '@/services/slidersService';
import toast from 'react-hot-toast';

// Fallback slides in case API fails or returns empty data
const fallbackSlides = [
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
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Fetch sliders from API
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setIsLoading(true);
        const response = await getActiveSliders();

        if (response.success && response.data && response.data.length > 0) {
          setSliders(response.data);
          setUseFallback(false);
        } else {
          // No sliders found, use fallback
          setUseFallback(true);
        }
      } catch (error) {
        console.error('Error fetching sliders:', error);
        toast.error('Failed to load sliders, showing default content');
        setUseFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliders();
  }, []);

  // Auto-slide timer
  useEffect(() => {
    const totalSlides = useFallback ? fallbackSlides.length : sliders.length;

    if (totalSlides === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [useFallback, sliders.length]);

  // Get current slides data
  const currentSlides = useFallback ? fallbackSlides : sliders;
  const totalSlides = currentSlides.length;

  // Show loading state
  if (isLoading) {
    return (
      <section className='home-section-2 home-section-bg pt-4 md:!pt-0 rounded-t-xl !shadow-muted overflow-x-hidden'>
        <div className='relative container-fluid p-0 ratio_27'>
          <div className='row'>
            <div className='col-12'>
              <div className='slider-animate skeleton-banner-xl'>
                <div className='relative !h-60 md:!h-80 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-xl animate-pulse flex items-center justify-center'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no slides available
  if (totalSlides === 0) {
    return null;
  }

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
                    className='absolute inset-0 rounded-t-xl'
                  >
                    {useFallback ? (
                      // Render fallback slides with gradient backgrounds
                      <div
                        className={`absolute inset-0 ${fallbackSlides[currentSlide].gradient} rounded-t-xl`}
                      >
                        <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
                          <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className='text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg'
                          >
                            {fallbackSlides[currentSlide].title}
                          </motion.h1>
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className='text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md'
                          >
                            {fallbackSlides[currentSlide].subtitle}
                          </motion.p>
                        </div>
                      </div>
                    ) : (
                      // Render API sliders with images
                      <div className='absolute inset-0 rounded-t-xl overflow-hidden'>
                        <img
                          src={sliders[currentSlide].image_url}
                          alt={`Slider ${sliders[currentSlide].id}`}
                          className='w-full h-full object-cover'
                          onError={(e) => {
                            e.currentTarget.src = '/assets/images/book/banner/1.jpg';
                          }}
                        />
                        {/* Optional overlay for better text readability */}
                        <div className='absolute inset-0 bg-black/20' />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
                  {currentSlides.map((_, index) => (
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
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                  className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 z-10'
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
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
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
