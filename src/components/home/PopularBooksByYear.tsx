import ProductCard from "../general/ProductCard";

const PopularBooksByYear = () => {
  const books = [
    {
      id: 1,
      image: 'assets/images/book/product/31.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: true,
    },
    {
      id: 2,
      image: 'assets/images/book/product/32.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 3,
      image: 'assets/images/book/product/33.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 4,
      image: 'assets/images/book/product/34.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 5,
      image: 'assets/images/book/product/35.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 6,
      image: 'assets/images/book/product/36.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: true,
    },
    {
      id: 7,
      image: 'assets/images/book/product/37.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 8,
      image: 'assets/images/book/product/38.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 9,
      image: 'assets/images/book/product/39.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: true,
    },
    {
      id: 10,
      image: 'assets/images/book/product/40.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 11,
      image: 'assets/images/book/product/41.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
    {
      id: 12,
      image: 'assets/images/book/product/42.jpg',
      description: 'Home Decor Lucky Deer Family Matte Finish Ceramic Figures',
      name:"Testing Name",
      author: 'Ellie Thomson, Henry',
      price: '$80.00',
      category: 'Biography',
      rating: 4.5,
      reviews: 120,
      isBest: false,
    },
  ];

  return (
    <section className='book-category'>
      <div className='container-fluid-lg'>
        <div className='title'>
          <h2>Popular books this year</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
          {books.map((book) => (
            <ProductCard key={book.id} item={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBooksByYear;
