import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBox from './home/SearchBox';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div className='fixed inset-0 z-50 flex items-start justify-center'>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/80'
            onClick={() => onOpenChange(false)}
            aria-hidden='true'
          />

          {/* Dialog Content */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className='relative z-50 w-full max-w-xl mt-20 px-4'
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div
              className='sr-only'
              role='dialog'
              aria-modal='true'
              aria-labelledby='search-dialog-title'
            >
              <h2 id='search-dialog-title'>Search Books and Authors</h2>
            </div>
            <SearchBox onClose={() => onOpenChange(false)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchDialog;
