import { Link } from 'react-router-dom';
import { useAuthDialog, type UserRole } from '@/context/AuthDialogContext';
import { useEffect, useState } from 'react';
import categoriesService from '@/services/categoriesService';
import { BOOKS_GENRES } from '@/services/API';
import type { Genre } from '@/types/types';

interface DropdownMenuItem {
  label: string;
  to?: string;
  state?:
    | { categoryId: number; categoryName: string }
    | { genreId: number; genreName: string; genreSlug: string };
  hasSubmenu?: boolean;
  submenu?: DropdownMenuItem[];
}

interface NavItem {
  type: 'link' | 'dropdown';
  label: string;
  to?: string;
  className: string;
  isDropdown?: boolean;
  dropdownMenu?: DropdownMenuItem[];
  dropdownContent?: any;
}

const navItems: NavItem[] = [
  {
    type: 'link',
    label: 'New',
    to: '/books?is_new=1',
    className: '',
    isDropdown: false,
  },
  {
    type: 'link',
    label: 'Trending',
    to: '/books?is_trending=1',
    className: 'lg:!ml-4',
    isDropdown: false,
  },
  {
    type: 'link',
    label: 'Popular',
    to: '/books?is_popular=1',
    className: 'lg:!ml-4',
    isDropdown: false,
  },
  {
    type: 'link',
    label: 'Best Sellers',
    to: '/books?is_best_seller=1',
    className: 'lg:!ml-4',
    isDropdown: false,
  },
  {
    type: 'link',
    label: 'Featured',
    to: '/books?featured=1',
    className: '!hidden 2xl:!block xl:!ml-4',
    isDropdown: false,
  },
  {
    type: 'dropdown',
    label: 'Categories',
    className: 'dropdown dropdown-mega lg:!mx-4',
    dropdownMenu: [], // This will be populated from the API
  },
  {
    type: 'dropdown',
    label: 'Genres',
    className: 'dropdown dropdown-mega lg:!ml-4',
    dropdownMenu: [], // This will be populated from the API
  },
];

const NavItem = ({ label, to, href, className, state, setShowMenu }: any) =>
  to ? (
    <li className={`nav-item ${className || ''}`}>
      <Link
        className='nav-link no-dropdown ps-xl-2 ps-0 !text-[16px]'
        to={to}
        state={state}
        onClick={() => setShowMenu(false)}
      >
        {label}
      </Link>
    </li>
  ) : (
    <li className={`nav-item ${className || ''}`}>
      <Link
        className='nav-link dropdown-toggle no-dropdown !text-[16px]'
        to={href || '#'}
        onClick={(e) => {
          if (!href) e.preventDefault();
          setShowMenu(false);
        }}
      >
        {label}
      </Link>
    </li>
  );

const DropdownNavItem = ({
  label,
  className,
  dropdownContent,
  dropdownMenu,
  onJoinClick,
  setShowMenu,
}: any) => {
  return (
    <li className={`nav-item !relative ${className || ''}`}>
      {dropdownContent ? (
        <>
          <Link
            className='nav-link dropdown-toggle !text-[16px]'
            to='#'
            data-bs-toggle='dropdown'
            onClick={(e) => e.preventDefault()}
          >
            {label}
          </Link>
          <div className='dropdown-menu dropdown-menu-3 dropdown-menu-2'>
            <div className='row'>
              {dropdownContent.map((col: any, idx: number) => (
                <div className='col-xl-3' key={idx}>
                  <div className='dropdown-column m-0'>
                    <h5 className='dropdown-header'>{col.header}</h5>
                    {col.items.map((item: string, i: number) => (
                      <a
                        className='dropdown-item'
                        href='/'
                        key={i}
                        onClick={() => setShowMenu(false)}
                      >
                        {item}
                      </a>
                    ))}
                    {col.subHeader && (
                      <h5 className='custom-mt dropdown-header'>{col.subHeader}</h5>
                    )}
                    {col.subItems &&
                      col.subItems.map((item: any, i: number) =>
                        typeof item === 'string' ? (
                          <Link
                            className='dropdown-item'
                            to='/'
                            key={i}
                            onClick={() => setShowMenu(false)}
                          >
                            {item}
                          </Link>
                        ) : (
                          <Link
                            className='dropdown-item'
                            to={item.href}
                            key={i}
                            onClick={() => setShowMenu(false)}
                          >
                            {item.label}
                            {item.hot && <label className='menu-label warning-label'>Hot</label>}
                          </Link>
                        )
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Link
            className='nav-link dropdown-toggle ps-xl-2 ps-0 !text-[16px]'
            to='#'
            data-bs-toggle='dropdown'
            onClick={(e) => e.preventDefault()}
          >
            {label}
          </Link>
          <ul className='dropdown-menu'>
            {dropdownMenu.map((item: any, idx: number) => (
              <li key={idx} className={item.hasSubmenu ? 'sub-dropdown-hover' : ''}>
                {item.hasSubmenu ? (
                  <>
                    <a className='dropdown-item !text-[14px]' href='javascript:void(0)'>
                      {item.label}
                    </a>
                    <ul className='sub-menu'>
                      {item.submenu.map((subItem: any, subIdx: number) => (
                        <li key={subIdx}>
                          <Link
                            className='!text-[14px]'
                            to={subItem.to}
                            state={subItem.state}
                            onClick={() => setShowMenu(false)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : item.to ? (
                  <Link
                    className='dropdown-item !text-[14px]'
                    to={item.to}
                    state={item.state}
                    onClick={() => setShowMenu(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    className='dropdown-item !text-[14px]'
                    href='javascript:void(0)'
                    onClick={() => {
                      onJoinClick && onJoinClick(item.label);
                      setShowMenu(false);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
};

const MainNav = ({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: (v: boolean) => void;
}) => {
  const { openChoice, isAuthenticated } = useAuthDialog();
  const [navItemsState, setNavItemsState] = useState<NavItem[]>(navItems);

  useEffect(() => {
    const fetchCategoriesAndGenres = async () => {
      try {
        // Fetch categories
        const categoriesData = await categoriesService.getCategories();
        if (categoriesData.status === 'success') {
          const updatedNavItems = [...navItemsState];
          const categoryIndex = updatedNavItems.findIndex((item) => item.label === 'Categories');

          if (categoryIndex !== -1) {
            updatedNavItems[categoryIndex] = {
              ...updatedNavItems[categoryIndex],
              dropdownMenu: categoriesData.data.categories.map((category) => ({
                label: category.category_name,
                hasSubmenu: category.children.length > 0,
                submenu: category.children.map((child) => ({
                  label: child.category_name,
                  to: `/books?category_name=${child.category_name}`,
                  state: { categoryId: child.id, categoryName: child.category_name },
                })),
                ...(category.children.length === 0 && {
                  to: `/books?category_name=${category.category_name}`,
                  state: { categoryId: category.id, categoryName: category.category_name },
                }),
              })),
            };
          }

          // Fetch genres
          const genresRes = await fetch(BOOKS_GENRES);
          if (genresRes.ok) {
            const { data } = await genresRes.json();
            const { genres } = data as { genres: Genre[] };

            const genreIndex = updatedNavItems.findIndex((item) => item.label === 'Genres');
            if (genreIndex !== -1 && genres && genres.length > 0) {
              updatedNavItems[genreIndex] = {
                ...updatedNavItems[genreIndex],
                dropdownMenu: genres.map((genre) => ({
                  label: genre.genre_name,
                  to: `/books?genre_slug=${encodeURIComponent(
                    genre.slug || genre.genre_name.toLowerCase().replace(/\s+/g, '-')
                  )}`,
                  state: {
                    genreId: genre.id,
                    genreName: genre.genre_name,
                    genreSlug: genre.slug,
                  },
                })),
              };
            }
          }

          setNavItemsState(updatedNavItems);
        }
      } catch (error) {
        console.error('Error fetching categories and genres:', error);
      }
    };

    fetchCategoriesAndGenres();
  }, []);

  const handleJoinClick = (label: string) => {
    // Map the label to the correct UserRole
    let role: UserRole;
    switch (label) {
      case 'As Customer':
        role = 'customer';
        break;
      case 'As Publisher':
        role = 'publisher';
        break;
      case 'As Reseller':
        role = 'reseller';
        break;
      default:
        role = 'customer';
    }
    openChoice(role);
  };

  return (
    <>
      <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
        <div className={`offcanvas offcanvas-collapse order-xl-2 ${showMenu ? 'show' : ''}`}>
          <div className='offcanvas-header navbar-shadow'>
            <h5>Menu</h5>
            <button
              className='btn-close lead'
              type='button'
              data-bs-dismiss='offcanvas'
              onClick={() => setShowMenu(false)}
            ></button>
          </div>
          <div className='offcanvas-body'>
            <ul className='navbar-nav'>
              {navItemsState.map((item, idx) =>
                item.type === 'dropdown' && item.label === 'Join Apsra' && !isAuthenticated ? (
                  <DropdownNavItem
                    key={idx}
                    {...item}
                    onJoinClick={handleJoinClick}
                    setShowMenu={setShowMenu}
                  />
                ) : item.type === 'dropdown' && item.label !== 'Join Apsra' ? (
                  <DropdownNavItem key={idx} {...item} setShowMenu={setShowMenu} />
                ) : item.type !== 'dropdown' ? (
                  <NavItem key={idx} {...item} setShowMenu={setShowMenu} />
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
