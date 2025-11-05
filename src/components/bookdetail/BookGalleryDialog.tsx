import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'react-feather';
import { IMAGE_BASE_URL } from '@/constants';

interface GalleryImage {
  id: number;
  image_name: string;
  image_type: string;
  display_order: number;
  is_primary: number;
}

interface BookGalleryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  initialIndex: number;
  bookTitle: string;
}

const BookGalleryDialog = ({
  isOpen,
  onClose,
  images,
  initialIndex,
  bookTitle,
}: BookGalleryDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images.length]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

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

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm'
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200'
            aria-label='Close gallery'
          >
            <X className='w-6 h-6 text-white' />
          </button>

          {/* Image Counter */}
          <div className='absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md'>
            <span className='text-white font-medium'>
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Main Content */}
          <div
            className='flex flex-col items-center justify-center h-full px-4 py-16'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className='relative w-full max-w-5xl h-[60vh] flex items-center justify-center'>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag='x'
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      handleNext();
                    } else if (swipe > swipeConfidenceThreshold) {
                      handlePrevious();
                    }
                  }}
                  className='absolute w-full h-full flex items-center justify-center'
                >
                  <img
                    src={IMAGE_BASE_URL + images[currentIndex].image_name}
                    alt={`${bookTitle} - Image ${currentIndex + 1}`}
                    className='max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none'
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/book/product/1.jpg';
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className='absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110'
                  aria-label='Previous image'
                >
                  <ChevronLeft className='w-6 h-6 text-white' />
                </button>
              )}

              {currentIndex < images.length - 1 && (
                <button
                  onClick={handleNext}
                  className='absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110'
                  aria-label='Next image'
                >
                  <ChevronRight className='w-6 h-6 text-white' />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            <div className='mt-8 w-full max-w-5xl overflow-x-auto overflow-y-hidden'>
              <div className='flex gap-2 justify-center min-w-min px-4'>
                {images.map((image, index) => (
                  <motion.button
                    key={image.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 object-contain ${
                      index === currentIndex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={IMAGE_BASE_URL + image.image_name}
                      alt={`Thumbnail ${index + 1}`}
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/book/product/1.jpg';
                      }}
                    />
                    {index === currentIndex && (
                      <motion.div
                        layoutId='activeThumbnail'
                        className='absolute inset-0 bg-white/20'
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Image Title/Caption */}
            <div className='mt-4 text-center'>
              <p className='text-white/80 text-sm'>
                {bookTitle} - Gallery Image {currentIndex + 1}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookGalleryDialog;
