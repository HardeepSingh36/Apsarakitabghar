import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

const searchTabs = [
  { value: 'book', label: 'Book', placeholder: 'Search for books...' },
  { value: 'author', label: 'Author', placeholder: 'Search for authors...' },
  { value: 'publisher', label: 'Publisher', placeholder: 'Search for publishers...' },
];

const SearchField = ({ placeholder, ariaLabel }: { placeholder: string; ariaLabel: string }) => (
  <form className='relative group'>
    <Input
      type='text'
      placeholder={placeholder}
      className='h-14 !rounded-none text-lg pr-16 bg-white/95 backdrop-blur-sm border-0 shadow-subtle focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary/20 transition-all duration-200 group-hover:shadow-emerald'
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
);

const SearchBox = () => {
  return (
    <div className='w-full bg-white/95 px-4 py-6 max-w-3xl rounded-md mx-auto'>
      <Tabs defaultValue='book' className='w-full'>
        {/* Tab List */}
        <TabsList className='grid w-full grid-cols-3 mb-4 bg-transparent backdrop-blur-sm h-10 shadow-subtle !rounded-none'>
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
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBox;
