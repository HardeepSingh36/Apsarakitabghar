import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Book, Pencil } from 'lucide-react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAuthors, searchBooks } from '@/services/bookService';
import { searchAuthors } from '@/services/AuthorsService';
import { IMAGE_BASE_URL } from '@/constants';

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
    { title: string; image: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [inputRect, setInputRect] = useState<DOMRect | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

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
        if (selectedIndex >= 0) {
          setQuery(filteredSuggestions[selectedIndex].title);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log(`Searching for ${activeTab}: ${query}`);
      setShowSuggestions(false);
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
        searchBooks({ q: e.target.value }).then(({ data }) => {
          const books = data.books.map((book: { title: string; cover_image_name: string }) => ({
            title: book.title,
            image: book.cover_image_name,
          }));
          setFilteredSuggestions(books);
          setShowSuggestions(books.length > 0);
        });
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.value.trim() !== '' && activeTab === 'author') {
      try {
        searchAuthors({ q: e.target.value }).then(({ data }) => {
          const authors = data.authors.map((author: { name: string; image_name: string }) => ({
            title: author.name,
            image: author.image_name,
          }));
          setFilteredSuggestions(authors);
          setShowSuggestions(authors.length > 0);
        });
      } catch (err) {
        console.log(err);
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
          className='absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg transition-all duration-200 hover:scale-105'
          aria-label={ariaLabel}
        >
          <Search className='h-5 w-5' />
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
                    key={suggestion.title}
                    type='button'
                    onClick={() => handleSuggestionClick(suggestion.title)}
                    className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-150 flex items-center gap-3 text-sm ${
                      index === selectedIndex
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}/${suggestion.image}`}
                      alt={suggestion.title}
                      className='h-10 w-10 flex-shrink-0 object-cover'
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
