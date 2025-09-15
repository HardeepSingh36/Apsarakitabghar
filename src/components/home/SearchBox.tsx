import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { getAuthors, searchBooks } from '@/services/bookService';

const searchTabs = [
  { value: 'book', label: 'Book', placeholder: 'Search for books...' },
  { value: 'author', label: 'Author', placeholder: 'Search for authors...' },
  { value: 'publisher', label: 'Publisher', placeholder: 'Search for publishers...' },
];

// Mock data for suggestions
// const mockSuggestions = {
//   book: [
//     'The Great Gatsby',
//     'To Kill a Mockingbird',
//     'Pride and Prejudice',
//     '1984',
//     'The Catcher in the Rye',
//     'Lord of the Flies',
//     'The Chronicles of Narnia',
//     "Harry Potter and the Sorcerer's Stone",
//     'The Hobbit',
//     'Game of Thrones',
//     'The Alchemist',
//     'One Hundred Years of Solitude',
//   ],
//   author: [
//     'F. Scott Fitzgerald',
//     'Harper Lee',
//     'Jane Austen',
//     'George Orwell',
//     'J.D. Salinger',
//     'William Golding',
//     'C.S. Lewis',
//     'J.K. Rowling',
//     'J.R.R. Tolkien',
//     'George R.R. Martin',
//     'Paulo Coelho',
//     'Gabriel García Márquez',
//   ],
//   publisher: [
//     'Penguin Random House',
//     'HarperCollins',
//     'Macmillan Publishers',
//     'Simon & Schuster',
//     'Hachette Book Group',
//     'Scholastic Corporation',
//     'Oxford University Press',
//     'Cambridge University Press',
//     'Wiley',
//     'Springer Nature',
//     'Pearson Education',
//     'McGraw-Hill Education',
//   ],
// };

interface SearchFieldProps {
  placeholder: string;
  ariaLabel: string;
  activeTab: string;
}

const SearchField = ({ placeholder, ariaLabel, activeTab }: SearchFieldProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (query.length > 0) {
  //     const suggestions = mockSuggestions[activeTab as keyof typeof mockSuggestions] || [];
  //     const filtered = suggestions.filter((item) =>
  //       item.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredSuggestions(filtered);
  //     setShowSuggestions(filtered.length > 0);
  //   } else {
  //     setShowSuggestions(false);
  //     setFilteredSuggestions([]);
  //   }
  //   setSelectedIndex(-1);
  // }, [query, activeTab]);

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
          setQuery(filteredSuggestions[selectedIndex]);
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
    if (e.target.value.trim() === '') {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      return;
    }
    if (activeTab === 'book') {
      try {
        searchBooks({ q: e.target.value }).then(({ data }) => {
          const titles = data.map((book: { title: string }) => book.title);
          setFilteredSuggestions(titles);
          setShowSuggestions(titles.length > 0);
        });
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.value.trim() !== '' && activeTab === 'author') {
      try {
        getAuthors().then(({ data }) => {
          const authors = data.map((author: { name: string }) => author.name);
          const filtered = authors.filter((name: string) =>
            name.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setFilteredSuggestions(filtered);
          setShowSuggestions(filtered.length > 0);
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
          onFocus={() => query.length > 0 && setShowSuggestions(filteredSuggestions.length > 0)}
          placeholder={placeholder}
          className='h-14 !rounded-none text-lg pr-16 bg-white/95 backdrop-blur-sm border-0 shadow-subtle focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary/20 transition-all duration-200 group-hover:shadow-emerald'
          aria-label={ariaLabel}
        />
        <Button
          size='icon'
          variant='ghost'
          className='absolute right-3 top-2 h-10 w-10 rounded-lg transition-all duration-200 hover:scale-105'
          aria-label={ariaLabel}
        >
          <Search className='h-5 w-5' />
        </Button>
      </form>
      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className='absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-dropdown max-h-52 overflow-y-auto'
        >
          <div className='max-h-64 py-2'>
            {filteredSuggestions.map((suggestion, index) => {
              // @ts-ignore
              const Icon = searchTabs.find((tab) => tab.value === activeTab)?.icon || Search;
              return (
                <button
                  key={suggestion}
                  type='button'
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-150 flex items-center gap-3 text-sm ${
                    index === selectedIndex ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  <Icon className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                  <span className='truncate'>{suggestion}</span>
                </button>
              );
            })}
          </div>
          {filteredSuggestions.length > 8 && (
            <div className='border-t border-border px-4 py-2 text-xs text-muted-foreground text-center'>
              Scroll for more results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState('book');
  return (
    <div className='w-full bg-white/95 px-4 py-6 max-w-3xl rounded-md mx-auto'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        {/* Tab List */}
        <TabsList className='grid w-full grid-cols-3 mb-4 bg-white/95 backdrop-blur-sm h-11 shadow-subtle shadow-sm !rounded-none'>
          {searchTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`!text-sm md:!text-base font-medium !rounded-lg py-1.5 data-[state=active]:bg-teal-600 data-[state=active]:text-primary-foreground data-[state=active]:shadow-emerald transition-all duration-200 px-4`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
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
