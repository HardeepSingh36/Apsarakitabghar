import Slider from 'react-slick';
import { useEffect, useState } from 'react';

const getClientsAndTeamsSlidesToShow = (width: number) => {
  if (width < 650) return 1;
  if (width < 992) return 2;
  return 3;
};

const getReviewsSlidesToShow = (width: number) => {
  if (width < 800) return 1;
  if (width < 992) return 3;
  if (width < 1200) return 4;
  return 4;
};

const baseClientsAndTeamsSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
};

const baseReviewsSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
};
const About = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clientsAndTeamsSlideSettings = {
    ...baseClientsAndTeamsSettings,
    slidesToShow: getClientsAndTeamsSlidesToShow(windowWidth),
  };

  const reviewsSliderSettings = {
    ...baseReviewsSettings,
    slidesToShow: getReviewsSlidesToShow(windowWidth),
  };

  return (
    <div>
      <section className='fresh-vegetable-section section-lg-space'>
        <div className='container-fluid-lg'>
          <div className='row gx-xl-5 gy-xl-0 g-3 ratio_148_1'>
            <div className='col-xl-6 col-12'>
              <div className='row g-sm-4 g-2'>
                <div className='col-6'>
                  <div className='fresh-image-2'>
                    <div>
                      <img
                        src='assets/images/inner-page/about-us/1.jpg'
                        className='bg-img blur-up lazyload'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='fresh-image'>
                    <div>
                      <img
                        src='assets/images/inner-page/about-us/2.jpg'
                        className='bg-img blur-up lazyload'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-12'>
              <div className='fresh-contain p-center-left'>
                <div>
                  <div className='review-title'>
                    <h4>About Us</h4>
                    <h2>We make Organic Food In Market</h2>
                  </div>
                  <div className='delivery-list'>
                    <p className='text-content'>
                      Just a few seconds to measure your body temperature. Up to 5 users! The
                      battery lasts up to 2 years. There are many variations of passages of Lorem
                      Ipsum available.We started in 2019 and haven't stopped smashing it since. A
                      global brand that doesn't sleep, we are 24/7 and always bringing something new
                      with over 100 new products dropping on the monthly, bringing you the latest
                      looks for less.
                    </p>
                    <ul className='delivery-box'>
                      <li>
                        <div className='delivery-box'>
                          <div className='delivery-icon'>
                            <img
                              src='assets/svg/3/delivery.svg'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </div>
                          <div className='delivery-detail'>
                            <h5 className='text'>Free delivery for all orders</h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='delivery-box'>
                          <div className='delivery-icon'>
                            <img src='assets/svg/3/leaf.svg' className='blur-up lazyload' alt='' />
                          </div>
                          <div className='delivery-detail'>
                            <h5 className='text'>Only fresh foods</h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='delivery-box'>
                          <div className='delivery-icon'>
                            <img
                              src='assets/svg/3/delivery.svg'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </div>
                          <div className='delivery-detail'>
                            <h5 className='text'>Free delivery for all orders</h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='delivery-box'>
                          <div className='delivery-icon'>
                            <img src='assets/svg/3/leaf.svg' className='blur-up lazyload' alt='' />
                          </div>
                          <div className='delivery-detail'>
                            <h5 className='text'>Only fresh foods</h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='client-section section-lg-space'>
        <div className='container-fluid-lg'>
          <div className='row'>
            <div className='col-12'>
              <div className='about-us-title text-center'>
                <h4>What We Do</h4>
                <h2 className='center'>We are Trusted by Clients</h2>
              </div>
              <div className='slider-3_1 product-wrapper'>
                <Slider key={windowWidth + '-clients'} {...clientsAndTeamsSlideSettings}>
                  <div>
                    <div className='clint-contain'>
                      <div className='client-icon'>
                        <img src='assets/svg/3/work.svg' className='blur-up lazyload' alt='' />
                      </div>
                      <h2>10</h2>
                      <h4>Business Years</h4>
                      <p>
                        A coffee shop is a small business that sells coffee, pastries, and other
                        morning goods. There are many different types of coffee shops around the
                        world.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='clint-contain'>
                      <div className='client-icon'>
                        <img src='assets/svg/3/buy.svg' className='blur-up lazyload' alt='' />
                      </div>
                      <h2>80 K+</h2>
                      <h4>Products Sales</h4>
                      <p>
                        Some coffee shops have a seating area, while some just have a spot to order
                        and then go somewhere else to sit down. The coffee shop that I am going to.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='clint-contain'>
                      <div className='client-icon'>
                        <img src='assets/svg/3/user.svg' className='blur-up lazyload' alt='' />
                      </div>
                      <h2>90%</h2>
                      <h4>Happy Customers</h4>
                      <p>
                        My goal for this coffee shop is to be able to get a coffee and get on with
                        my day. It's a Thursday morning and I am rushing between meetings.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='team-section section-lg-space'>
        <div className='container-fluid-lg'>
          <div className='about-us-title text-center'>
            <h4 className='text-content'>Our Creative Team</h4>
            <h2 className='center'>Apsra Kitab Ghar team member</h2>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='slider-user product-wrapper'>
                <Slider key={windowWidth + '-team'} {...clientsAndTeamsSlideSettings}>
                  <div>
                    <div className='team-box'>
                      <div className='team-image'>
                        <img
                          src='assets/images/inner-page/user/1.jpg'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                      </div>
                      <div className='team-name'>
                        <h3>Anna Baranov</h3>
                        <h5>Marketing</h5>
                        <p>cheeseburger airedale mozzarella the big cheese fondue.</p>
                        <ul className='team-media'>
                          <li>
                            <a href='https://www.facebook.com/' className='fb-bg'>
                              <i className='fa-brands fa-facebook-f'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://in.pinterest.com/' className='pint-bg'>
                              <i className='fa-brands fa-pinterest-p'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://twitter.com/' className='twitter-bg'>
                              <i className='fa-brands fa-twitter'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://www.instagram.com/' className='insta-bg'>
                              <i className='fa-brands fa-instagram'></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='team-box'>
                      <div className='team-image'>
                        <img
                          src='assets/images/inner-page/user/2.jpg'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                      </div>
                      <div className='team-name'>
                        <h3>Anna Baranov</h3>
                        <h5>Marketing</h5>
                        <p>
                          cheese on toast mozzarella bavarian bergkase smelly cheese cheesy feet.
                        </p>
                        <ul className='team-media'>
                          <li>
                            <a href='https://www.facebook.com/' className='fb-bg'>
                              <i className='fa-brands fa-facebook-f'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://in.pinterest.com/' className='pint-bg'>
                              <i className='fa-brands fa-pinterest-p'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://twitter.com/' className='twitter-bg'>
                              <i className='fa-brands fa-twitter'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://www.instagram.com/' className='insta-bg'>
                              <i className='fa-brands fa-instagram'></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='team-box'>
                      <div className='team-image'>
                        <img
                          src='assets/images/inner-page/user/3.jpg'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                      </div>
                      <div className='team-name'>
                        <h3>Anna Baranov</h3>
                        <h5>Marketing</h5>
                        <p>
                          camembert de normandie. Bocconcini rubber cheese fromage frais port-salut.
                        </p>
                        <ul className='team-media'>
                          <li>
                            <a href='https://www.facebook.com/' className='fb-bg'>
                              <i className='fa-brands fa-facebook-f'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://in.pinterest.com/' className='pint-bg'>
                              <i className='fa-brands fa-pinterest-p'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://twitter.com/' className='twitter-bg'>
                              <i className='fa-brands fa-twitter'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://www.instagram.com/' className='insta-bg'>
                              <i className='fa-brands fa-instagram'></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='team-box'>
                      <div className='team-image'>
                        <img
                          src='assets/images/inner-page/user/4.jpg'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                      </div>
                      <div className='team-name'>
                        <h3>Anna Baranov</h3>
                        <h5>Marketing</h5>
                        <p>
                          Fondue stinking bishop goat. Macaroni cheese croque monsieur cottage
                          cheese.
                        </p>
                        <ul className='team-media'>
                          <li>
                            <a href='https://www.facebook.com/' className='fb-bg'>
                              <i className='fa-brands fa-facebook-f'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://in.pinterest.com/' className='pint-bg'>
                              <i className='fa-brands fa-pinterest-p'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://twitter.com/' className='twitter-bg'>
                              <i className='fa-brands fa-twitter'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://www.instagram.com/' className='insta-bg'>
                              <i className='fa-brands fa-instagram'></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='team-box'>
                      <div className='team-image'>
                        <img
                          src='assets/images/inner-page/user/1.jpg'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                      </div>
                      <div className='team-name'>
                        <h3>Anna Baranov</h3>
                        <h5>Marketing</h5>
                        <p>squirty cheese cheddar macaroni cheese airedale cheese triangles.</p>
                        <ul className='team-media'>
                          <li>
                            <a href='https://www.facebook.com/' className='fb-bg'>
                              <i className='fa-brands fa-facebook-f'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://in.pinterest.com/' className='pint-bg'>
                              <i className='fa-brands fa-pinterest-p'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://twitter.com/' className='twitter-bg'>
                              <i className='fa-brands fa-twitter'></i>
                            </a>
                          </li>
                          <li>
                            <a href='https://www.instagram.com/' className='insta-bg'>
                              <i className='fa-brands fa-instagram'></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='review-section section-lg-space'>
        <div className='container-fluid'>
          <div className='about-us-title text-center'>
            <h4 className='text-content'>Latest Testimonials</h4>
            <h2 className='center'>What people say</h2>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='slider-4-half product-wrapper overflow-hidden'>
                <Slider key={windowWidth + '-reviews'} {...reviewsSliderSettings}>
                  <div>
                    <div className='reviewer-box'>
                      <i className='fa-solid fa-quote-right'></i>
                      <div className='product-rating'>
                        <ul className='rating'>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star'></i>
                          </li>
                        </ul>
                      </div>
                      <h3>Top Quality, Beautiful Location</h3>
                      <p>
                        "I usually try to keep my sadness pent up inside where it can fester quietly
                        as a mental illness. There, now he's trapped in a book I wrote: a crummy
                        world of plot holes and spelling errors! As an interesting side note."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/1.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>
                        <div className='reviewer-name'>
                          <h4>Betty J. Turner</h4>
                          <h6>CTO, Company</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='reviewer-box'>
                      <i className='fa-solid fa-quote-right'></i>
                      <div className='product-rating'>
                        <ul className='rating'>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star'></i>
                          </li>
                        </ul>
                      </div>
                      <h3>Top Quality, Beautiful Location</h3>
                      <p>
                        "I usually try to keep my sadness pent up inside where it can fester quietly
                        as a mental illness. There, now he's trapped in a book I wrote: a crummy
                        world of plot holes and spelling errors! As an interesting side note."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/1.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>
                        <div className='reviewer-name'>
                          <h4>Betty J. Turner</h4>
                          <h6>CTO, Company</h6>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div>
                    <div className='reviewer-box'>
                      <i className='fa-solid fa-quote-right'></i>
                      <div className='product-rating'>
                        <ul className='rating'>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star'></i>
                          </li>
                        </ul>
                      </div>
                      <h3>Top Quality, Beautiful Location</h3>
                      <p>
                        "I usually try to keep my sadness pent up inside where it can fester quietly
                        as a mental illness. There, now he's trapped in a book I wrote: a crummy
                        world of plot holes and spelling errors! As an interesting side note."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/1.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>
                        <div className='reviewer-name'>
                          <h4>Betty J. Turner</h4>
                          <h6>CTO, Company</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='reviewer-box'>
                      <i className='fa-solid fa-quote-right'></i>
                      <div className='product-rating'>
                        <ul className='rating'>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star'></i>
                          </li>
                        </ul>
                      </div>
                      <h3>Top Quality, Beautiful Location</h3>
                      <p>
                        "I usually try to keep my sadness pent up inside where it can fester quietly
                        as a mental illness. There, now he's trapped in a book I wrote: a crummy
                        world of plot holes and spelling errors! As an interesting side note."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/1.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>
                        <div className='reviewer-name'>
                          <h4>Betty J. Turner</h4>
                          <h6>CTO, Company</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='reviewer-box'>
                      <i className='fa-solid fa-quote-right'></i>
                      <div className='product-rating'>
                        <ul className='rating'>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star' className='fill'></i>
                          </li>
                          <li>
                            <i data-feather='star'></i>
                          </li>
                        </ul>
                      </div>
                      <h3>Top Quality, Beautiful Location</h3>
                      <p>
                        "I usually try to keep my sadness pent up inside where it can fester quietly
                        as a mental illness. There, now he's trapped in a book I wrote: a crummy
                        world of plot holes and spelling errors! As an interesting side note."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/1.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>
                        <div className='reviewer-name'>
                          <h4>Betty J. Turner</h4>
                          <h6>CTO, Company</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className='section-t-space'>
        <div className='container-fluid-lg'>
          <div className='service-section'>
            <div className='row g-3'>
              <div className='col-12'>
                <div className='service-contain'>
                  <div className='service-box'>
                    <div className='service-image'>
                      <img src='assets/svg/product.svg' className='blur-up lazyload' alt='' />
                    </div>
                    <div className='service-detail'>
                      <h5>Every Fresh Products</h5>
                    </div>
                  </div>
                  <div className='service-box'>
                    <div className='service-image'>
                      <img src='assets/svg/delivery.svg' className='blur-up lazyload' alt='' />
                    </div>
                    <div className='service-detail'>
                      <h5>Free Delivery For Order Over $50</h5>
                    </div>
                  </div>
                  <div className='service-box'>
                    <div className='service-image'>
                      <img src='assets/svg/discount.svg' className='blur-up lazyload' alt='' />
                    </div>
                    <div className='service-detail'>
                      <h5>Daily Mega Discounts</h5>
                    </div>
                  </div>
                  <div className='service-box'>
                    <div className='service-image'>
                      <img src='assets/svg/market.svg' className='blur-up lazyload' alt='' />
                    </div>
                    <div className='service-detail'>
                      <h5>Best Price On The Market</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='sub-footer section-small-space'>
            <div className='reserve'>
              <h6 className='text-content'>©2024 Apsra Kitab Ghar All rights reserved</h6>
            </div>
            <div className='payment'>
              <img src='assets/images/payment/1.png' className='blur-up lazyload' alt='' />
            </div>
            <div className='social-link'>
              <h6 className='text-content'>Stay connected :</h6>
              <ul>
                <li>
                  <a href='https://www.facebook.com/' target='_blank'>
                    <i className='fa-brands fa-facebook-f'></i>
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/' target='_blank'>
                    <i className='fa-brands fa-twitter'></i>
                  </a>
                </li>
                <li>
                  <a href='https://www.instagram.com/' target='_blank'>
                    <i className='fa-brands fa-instagram'></i>
                  </a>
                </li>
                <li>
                  <a href='https://in.pinterest.com/' target='_blank'>
                    <i className='fa-brands fa-pinterest-p'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default About;
