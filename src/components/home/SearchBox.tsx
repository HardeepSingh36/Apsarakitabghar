import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Book, Pencil } from 'lucide-react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { searchBooks, getBookById } from '@/services/bookService';
import { searchAuthors } from '@/services/AuthorsService';
import { IMAGE_BASE_URL } from '@/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const searchTabs = [
  {
    value: 'book',
    label: 'Book',
    placeholder: 'Search for books...',
    icon: Book,
  },
  {
    value: 'author',
    label: 'Author',
    placeholder: 'Search for authors...',
    icon: Pencil,
  },
  // {
  //   value: 'publisher',
  //   label: 'Publisher',
  //   placeholder: 'Search for publishers...',
  //   icon: Building2,
  // },
];
interface SearchFieldProps {
  placeholder: string;
  ariaLabel: string;
  activeTab: string;
}

const SearchField = ({ placeholder, ariaLabel, activeTab }: SearchFieldProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { id: string; title: string; image: string; slug: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [inputRect, setInputRect] = useState<DOMRect | null>(null);
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions && e.key !== 'Enter') return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          // Navigate to selected suggestion
          handleSuggestionNavigation(filteredSuggestions[selectedIndex]);
        } else if (query.trim()) {
          // Search with current query
          handleSearch(query.trim());
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const validateAndNavigateToBook = async (book: {
    id: string;
    title: string;
    image: string;
    slug?: string;
  }) => {
    try {
      // Validate book exists by fetching it
      const response = await getBookById(book.id);
      if (response.status === 'success' && response.data) {
        // Book exists, navigate to book detail page with complete book data
        const completeBook = response.data;
        navigate(`/books/${book.slug || book.id}`, { state: { item: completeBook } });
      } else {
        toast.error('Book not found.');
      }
    } catch (error) {
      console.error('Book validation error:', error);
      toast.error('Book not found or unavailable.');
    }
  };

  const handleSuggestionNavigation = async (suggestion: {
    id: string;
    title: string;
    image: string;
    slug?: string;
  }) => {
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      if (activeTab === 'book') {
        // Validate book exists before navigation
        await validateAndNavigateToBook(suggestion);
      } else if (activeTab === 'author') {
        // Navigate to author page or books by author
        navigate(`/books?author=${suggestion.id}`);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Failed to navigate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: {
    id: string;
    title: string;
    image: string;
    slug?: string;
  }) => {
    handleSuggestionNavigation(suggestion);
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setShowSuggestions(false);

    try {
      if (activeTab === 'book') {
        // Search for books and redirect to books page with search query
        const results = await searchBooks({ q: searchQuery });
        if (results.data.books.length > 0) {
          // If there's an exact match by title, navigate to that book
          const exactMatch = results.data.books.find(
            (book: { title: string }) => book.title.toLowerCase() === searchQuery.toLowerCase()
          );

          if (exactMatch) {
            // Navigate directly to the book detail page
            await validateAndNavigateToBook(exactMatch);
          } else {
            // Navigate to books page with search query
            navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
          }
        } else {
          toast.error('No books found for your search.');
        }
      } else if (activeTab === 'author') {
        // Search for authors and redirect to books by author
        const results = await searchAuthors({ q: searchQuery });
        if (results.data.authors.length > 0) {
          const exactMatch = results.data.authors.find(
            (author: { name: string }) => author.name.toLowerCase() === searchQuery.toLowerCase()
          );

          if (exactMatch) {
            // Navigate to books by this specific author
            navigate(`/books?author=${exactMatch.id}`);
          } else {
            // Navigate to books page with author search
            navigate(`/books?search=${encodeURIComponent(searchQuery)}&type=author`);
          }
        } else {
          toast.error('No authors found for your search.');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query.trim());
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === '' || e.target.value.trim().length < 2) {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      return;
    }

    // Get input position for portal dropdown
    if (inputRef.current) {
      setInputRect(inputRef.current.getBoundingClientRect());
    }

    if (activeTab === 'book') {
      try {
        searchBooks({ q: e.target.value })
          .then(({ data }) => {
            console.log('The data is: ', data);
            const books = data.books.map(
              (book: { id: string; title: string; cover_image_name: string; slug?: string }) => ({
                id: book.id,
                title: book.title,
                image: book.cover_image_name,
                slug: book.slug,
              })
            );
            setFilteredSuggestions(books);
            setShowSuggestions(books.length > 0);
          })
          .catch((err) => {
            console.error('Book search error:', err);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
          });
      } catch (err) {
        console.error('Book search error:', err);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else if (e.target.value.trim() !== '' && activeTab === 'author') {
      try {
        searchAuthors({ q: e.target.value })
          .then(({ data }) => {
            const authors = data.authors.map(
              (author: { id: string; name: string; image_name: string }) => ({
                id: author.id,
                title: author.name,
                image: author.image_name,
              })
            );
            setFilteredSuggestions(authors);
            setShowSuggestions(authors.length > 0);
          })
          .catch((err) => {
            console.error('Author search error:', err);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
          });
      } catch (err) {
        console.error('Author search error:', err);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit} className='relative group'>
        <Input
          ref={inputRef}
          type='text'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (query.length > 0) setShowSuggestions(filteredSuggestions.length > 0);
            if (inputRef.current) setInputRect(inputRef.current.getBoundingClientRect());
          }}
          placeholder={placeholder}
          className='h-11 md:h-14 !rounded-none text-lg pr-16 bg-white/95 backdrop-blur-sm border-0 shadow-subtle focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary/20 transition-all duration-200 group-hover:shadow-emerald'
          aria-label={ariaLabel}
        />
        <Button
          size='icon'
          variant='ghost'
          disabled={isLoading}
          className='absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50'
          aria-label={ariaLabel}
        >
          {isLoading ? (
            <div className='animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full' />
          ) : (
            <Search className='h-5 w-5' />
          )}
        </Button>
      </form>
      {/* Suggestions Dropdown via Portal */}
      {showSuggestions &&
        filteredSuggestions.length > 0 &&
        inputRect &&
        createPortal(
          <div
            ref={suggestionsRef}
            style={{
              position: 'absolute',
              top: inputRect.bottom + window.scrollY,
              left: inputRect.left + window.scrollX,
              width: inputRect.width,
              zIndex: 100,
            }}
            className='mt-2 bg-background border border-border rounded-lg shadow-dropdown max-h-52 overflow-y-auto'
          >
            <div className='max-h-64 py-2'>
              {filteredSuggestions.map((suggestion, index) => {
                return (
                  <button
                    key={suggestion.id}
                    type='button'
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                    className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-150 flex items-center gap-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                      index === selectedIndex
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}/${suggestion.image}`}
                      alt={suggestion.title}
                      className='h-10 w-10 flex-shrink-0 object-cover rounded'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/images/book/placeholder.jpg'; // fallback image
                      }}
                    />
                    <span className='truncate notranslate'>{suggestion.title}</span>
                  </button>
                );
              })}
            </div>
            {filteredSuggestions.length > 8 && (
              <div className='border-t border-border px-4 py-2 text-xs text-muted-foreground text-center'>
                Scroll for more results
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState('book');
  return (
    <div className='w-full bg-white/95 px-2 sm:!px-6 py-6 max-w-3xl rounded-md mx-auto'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        {/* Tab List */}
        <TabsList
          className='flex w-full justify-between mb-4 bg-white/95 backdrop-blur-sm h-11 shadow-subtle shadow-sm !rounded-none overflow-x-scroll'
          style={{ scrollbarWidth: 'none' }}
        >
          {searchTabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`!text-sm flex-1 md:!text-base font-medium !rounded-lg py-1.5 data-[state=active]:bg-teal-600 data-[state=active]:text-primary-foreground data-[state=active]:shadow-emerald transition-all duration-200 px-4`}
              >
                <TabIcon className='inline w-3 h-3 sm:w-4 sm:h-4 mr-1' />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Contents */}
        <div className='relative'>
          {searchTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className='mt-0'>
              <SearchField
                placeholder={tab.placeholder}
                ariaLabel={`Search ${tab.label.toLowerCase()}`}
                activeTab={tab.value}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBox;
