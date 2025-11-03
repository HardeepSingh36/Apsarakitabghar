import HomeSection from '@/components/home/HomeSection';
import PopularBooksByYear from '@/components/home/PopularBooksByYear';
import TopSellingBooks from '@/components/home/TopSellingBooks';

const Home = () => {
  return (
    <>
      <HomeSection />
      {/* <BooksGenres /> */}
      <PopularBooksByYear />
      <TopSellingBooks />
    </>
  );
};

export default Home;
