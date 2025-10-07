import { Link } from 'react-router-dom';
import { Printer } from 'react-feather';
import { useEffect, useState } from 'react';
// import { useCurrency } from '@/context/CurrencyContext';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

const HeaderTop = () => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  // const { currency, setCurrency } = useCurrency();

  const langMap: Record<string, string> = {
    english: 'en',
    hindi: 'hi',
    punjabi: 'pa',
  };

  const flagMap: Record<string, string> = {
    english: '/assets/images/country/india.png',
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
      <div className='container-fluid-lg flex justify-between'>
          <div className=' text-white'>
            <Link to='/publish-book' className='flex text-white gap-2 min-w-36'>
              <Printer size={18} />
              Publish With Us
            </Link>
          </div>


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
                          className='dropdown-item notranslate'
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
              {/* <li className='right-nav-list'>
                <div className='dropdown theme-form-select'>
                  <button
                    className='btn dropdown-toggle'
                    type='button'
                    id='select-dollar'
                    data-bs-toggle='dropdown'
                  >
                    <span>{currency.code}</span>
                  </button>
                  <ul className='dropdown-menu dropdown-menu-end sm-dropdown-menu'>
                    <li>
                      <button
                        className='dropdown-item'
                        id='inr'
                        onClick={() => {
                          setCurrency({ code: 'INR', sign: '₹' });
                        }}
                      >
                        INR
                      </button>
                    </li>
                    <li>
                      <button
                        className='dropdown-item'
                        id='usd'
                        onClick={() => {
                          setCurrency({ code: 'USD', sign: '$' });
                        }}
                      >
                        USD
                      </button>
                    </li>
                    <li>
                      <button
                        className='dropdown-item'
                        id='eur'
                        onClick={() => setCurrency({ code: 'EUR', sign: '€' })}
                      >
                        EUR
                      </button>
                    </li>
                  </ul>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
    </div>
  );
};

export default HeaderTop;
