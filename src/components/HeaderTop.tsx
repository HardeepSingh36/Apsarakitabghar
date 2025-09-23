import { Link } from 'react-router-dom';
import { Printer } from 'react-feather';
import { useState } from 'react';
import PublishBookModal from './dashboard/PublishBookModal';

const HeaderTop = () => {
  const [isPublishModalOpen, setPublishModalOpen] = useState(false);

  return (
    <div className='header-top'>
      <div className='container-fluid-lg'>
        <div className='flex justify-between'>
          <div className='col-xxl-2 d-xxl-block text-white'>
            <Link
              to='#'
              className='flex text-white gap-2 min-w-36'
              onClick={(e) => {
                e.preventDefault();
                setPublishModalOpen(true);
              }}
            >
              <Printer size={18} />
              Publish With Us
            </Link>
          </div>
          <div className='col-xxl-6 col-lg-9 d-lg-block d-none'></div>
          <div className='col-lg-3'>
            <ul className='about-list right-nav-about'>
              <li className='right-nav-list'>
                <div className='dropdown theme-form-select'>
                  <button
                    className='btn dropdown-toggle'
                    type='button'
                    id='select-language'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='/assets/images/country/united-kingdom.png'
                      className='img-fluid blur-up lazyload'
                      alt=''
                    />
                    <span>English</span>
                  </button>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    <li>
                      <a className='dropdown-item' href='javascript:void(0)' id='english'>
                        <img
                          src='/assets/images/country/united-kingdom.png'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                        <span>English</span>
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='javascript:void(0)' id='france'>
                        <img
                          src='/assets/images/country/germany.png'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                        <span>Germany</span>
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='javascript:void(0)' id='chinese'>
                        <img
                          src='/assets/images/country/turkish.png'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                        <span>Turki</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className='right-nav-list'>
                <div className='dropdown theme-form-select'>
                  <button
                    className='btn dropdown-toggle'
                    type='button'
                    id='select-dollar'
                    data-bs-toggle='dropdown'
                  >
                    <span>INR</span>
                  </button>
                  <ul className='dropdown-menu dropdown-menu-end sm-dropdown-menu'>
                    <li>
                      <a className='dropdown-item' id='aud' href='javascript:void(0)'>
                        USD
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' id='eur' href='javascript:void(0)'>
                        EUR
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' id='cny' href='javascript:void(0)'>
                        AUD
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <PublishBookModal isOpen={isPublishModalOpen} onClose={() => setPublishModalOpen(false)} />
    </div>
  );
};

export default HeaderTop;
