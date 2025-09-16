import Breadcrumb from '@/components/ui/Breadcrumb';
import Slider from 'react-slick';

const clientsAndTeamsSlideSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 650,
      settings: { slidesToShow: 1 },
    },
  ],
};

const reviewsSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 3 },
      centerMode: true,
    },
    {
      breakpoint: 800,
      settings: { slidesToShow: 1 },
    },
  ],
};

const About = () => {
  return (
    <div>
      <Breadcrumb
        title='About Us'
        items={[{ label: '', href: '/', iconClass: 'fa-solid fa-house' }, { label: 'About Us' }]}
      />
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
                <Slider {...clientsAndTeamsSlideSettings}>
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
                <Slider {...clientsAndTeamsSlideSettings}>
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
                <Slider {...reviewsSliderSettings}>
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
                        "My busy schedule leaves little, if any, time for blogging and social media.
                        The Lorem Ipsum Company has been a huge part of helping me grow my business
                        through organic search and content marketing."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/2.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>

                        <div className='reviewer-name'>
                          <h4>Alfredo S. Rocha</h4>
                          <h6>Project Manager</h6>
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
                        "Professional, responsive, and able to keep up with ever-changing demand and
                        tight deadlines: That's how I would describe Jeramy and his team at The
                        Lorem Ipsum Company. When it comes to content marketing."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/3.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>

                        <div className='reviewer-name'>
                          <h4>Donald C. Spurr</h4>
                          <h6>Sale Agents</h6>
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
                        "After being forced to move twice within five years, our customers had a
                        hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only
                        revitalized our brand."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/4.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>

                        <div className='reviewer-name'>
                          <h4>Terry G. Fain</h4>
                          <h6>Photographer</h6>
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
                        "I was skeptical of SEO and content marketing at first, but the Lorem Ipsum
                        Company not only proved itself financially speaking, but the response I have
                        received from customers is incredible."
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
                          <h4>Gwen J. Geiger</h4>
                          <h6>Designer</h6>
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
                        "Jeramy and his team at the Lorem Ipsum Company whipped my website into
                        shape just in time for tax season. I was excited by the results and am proud
                        to direct clients to my website once again."
                      </p>

                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/2.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>

                        <div className='reviewer-name'>
                          <h4>Constance K. Whang</h4>
                          <h6>CEO, Company</h6>
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
                        "Yeah, and if you were the pope they'd be all, "Straighten your pope hat."
                        And "Put on your good vestments." What are their names? Yep, I remember.
                        They came in last at the Olympics!"
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/3.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>

                        <div className='reviewer-name'>
                          <h4>Christopher R. Lee</h4>
                          <h6>Managing Director</h6>
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
                        "Good man. Nixon's pro-war and pro-family. Hey, tell me something. You've
                        got all this money. How come you always dress like you're doing your
                        laundry? So, how 'bout them Knicks? What kind of a father would I be if I
                        said no?."
                      </p>
                      <div className='reviewer-profile'>
                        <div className='reviewer-image'>
                          <img
                            src='assets/images/inner-page/user/4.jpg'
                            className='blur-up lazyload'
                            alt=''
                          />
                        </div>

                        <div className='reviewer-name'>
                          <h4>Eileen R. Chu</h4>
                          <h6>Marketing Director</h6>
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
