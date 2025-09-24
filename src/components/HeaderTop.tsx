import { Link } from 'react-router-dom';
import { Printer } from 'react-feather';
import { useEffect, useState } from 'react';
import PublishBookModal from './dashboard/PublishBookModal';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

const HeaderTop = () => {
  const [isPublishModalOpen, setPublishModalOpen] = useState(false);

  useEffect(() => {
    // Add the Google Translate container
    const container = document.createElement('div');
    container.id = 'google_translate_element';
    container.style.display = 'none';
    document.body.appendChild(container);

    // Define global init function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,hi,pa', autoDisplay: false },
        'google_translate_element'
      );
    };

    // Load script dynamically
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(container);
      document.body.removeChild(script);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    const select = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
    if (!select) {
      console.log('Google translate select not found yet, retrying...');
      setTimeout(() => changeLanguage(lang), 500);
      return;
    }

    const langMap: Record<string, string> = {
      english: 'en',
      hindi: 'hi',
      punjabi: 'pa',
    };

    select.value = langMap[lang.toLowerCase()];
    select.dispatchEvent(new Event('change'));

    // Refresh the page after a short delay so translation applies
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 1 second delay ensures Google Translate has started
  };

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
                      <Link
                        className='dropdown-item'
                        to='#'
                        id='english'
                        onClick={(e) => {
                          e.preventDefault();
                          changeLanguage('english');
                        }}
                      >
                        <img
                          src='/assets/images/country/united-kingdom.png'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                        <span>English</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='dropdown-item'
                        to='#'
                        id='france'
                        onClick={(e) => {
                          e.preventDefault();
                          changeLanguage('hindi');
                        }}
                      >
                        <img
                          src='/assets/images/country/germany.png'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                        <span>हिन्दी</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='dropdown-item'
                        to='#'
                        id='chinese'
                        onClick={(e) => {
                          e.preventDefault();
                          changeLanguage('punjabi');
                        }}
                      >
                        <img
                          src='/assets/images/country/turkish.png'
                          className='img-fluid blur-up lazyload'
                          alt=''
                        />
                        <span>ਪੰਜਾਬੀ</span>
                      </Link>
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
