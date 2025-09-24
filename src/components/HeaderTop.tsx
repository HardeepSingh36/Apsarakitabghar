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
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const langMap: Record<string, string> = {
    english: 'en',
    hindi: 'hi',
    punjabi: 'pa',
  };

  const flagMap: Record<string, string> = {
    english: '/assets/images/country/united-kingdom.png',
    hindi: '/assets/images/country/india.png',
    punjabi: '/assets/images/country/india.png',
  };

  // Load Google Translate script
  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'google_translate_element';
    container.style.display = 'none';
    document.body.appendChild(container);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,hi,pa', autoDisplay: false },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // On load, apply saved language
    const savedLang = localStorage.getItem('selectedLanguage') || 'english';
    setCurrentLanguage(savedLang.charAt(0).toUpperCase() + savedLang.slice(1));

    return () => {
      document.body.removeChild(container);
      document.body.removeChild(script);
    };
  }, []);

  // Change language function
  const changeLanguage = (lang: string) => {
    const select = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
    if (!select) {
      console.log('Google Translate select not found yet, retrying...');
      setTimeout(() => changeLanguage(lang), 500);
      return;
    }

    select.value = langMap[lang.toLowerCase()];
    select.dispatchEvent(new Event('change'));

    // Save selection in localStorage
    localStorage.setItem('selectedLanguage', lang.toLowerCase());
    setCurrentLanguage(lang.charAt(0).toUpperCase() + lang.slice(1));

    // Reload page after a short delay to ensure translation applies
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
              {/* Language Dropdown */}
              <li className='right-nav-list'>
                <div className='dropdown theme-form-select'>
                  <button
                    className='btn dropdown-toggle'
                    type='button'
                    id='select-language'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src={flagMap[currentLanguage.toLowerCase()]}
                      className='img-fluid blur-up lazyload'
                      alt={currentLanguage}
                      style={{ width: 20, marginRight: 5 }}
                    />
                    <span>{currentLanguage}</span>
                  </button>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    {Object.keys(langMap).map((lang) => (
                      <li key={lang}>
                        <Link
                          className='dropdown-item'
                          to='#'
                          onClick={(e) => {
                            e.preventDefault();
                            changeLanguage(lang);
                          }}
                        >
                          <img
                            src={flagMap[lang]}
                            alt={lang}
                            style={{ width: 20, marginRight: 8 }}
                          />
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Currency Dropdown */}
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
                      <a className='dropdown-item' id='aud' href='#'>
                        USD
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' id='eur' href='#'>
                        EUR
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' id='cny' href='#'>
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
