import { Link } from 'react-router-dom';
import { useAuthDialog, type UserRole } from '@/context/AuthDialogContext';

const navItems = [
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
    className: 'lg:!ml-4',
    isDropdown: false,
  },
  // {
  //   type: 'dropdown',
  //   label: 'Special Collections',
  //   className: 'dropdown lg:!ml-4',
  //   dropdownMenu: [
  //     { label: 'New & Trending', to: '/books?is_new=1&is_trending=1' },
  //     { label: 'Popular Bestsellers', to: '/books?is_popular=1&is_best_seller=1' },
  //     { label: 'Featured New Arrivals', to: '/books?featured=1&is_new=1' },
  //     { label: 'Trending Bestsellers', to: '/books?is_trending=1&is_best_seller=1' },
  //   ],
  // },
  {
    type: 'dropdown',
    label: 'Categories',
    className: 'dropdown dropdown-mega lg:!ml-4',
    dropdownMenu: [
      { label: 'Fiction', to: '/books?category=fiction' },
      { label: 'Non-Fiction', to: '/books?category=non-fiction' },
      { label: 'Science Fiction', to: '/books?category=science-fiction' },
      { label: 'Fantasy', to: '/books?category=fantasy' },
      { label: 'Mystery', to: '/books?category=mystery' },
      { label: 'Biography', to: '/books?category=biography' },
    ],
  },
];

const NavItem = ({ label, to, href, className }: any) =>
  to ? (
    <li className={`nav-item ${className || ''}`}>
      <Link className='nav-link no-dropdown ps-xl-2 ps-0' to={to}>
        {label}
      </Link>
    </li>
  ) : (
    <li className={`nav-item ${className || ''}`}>
      <a className='nav-link dropdown-toggle no-dropdown' href={href}>
        {label}
      </a>
    </li>
  );

const DropdownNavItem = ({ label, className, dropdownContent, dropdownMenu, onJoinClick }: any) => {
  return (
    <li className={`nav-item ${className || ''}`}>
      {dropdownContent ? (
        <>
          <a
            className='nav-link dropdown-toggle'
            href='javascript:void(0)'
            data-bs-toggle='dropdown'
          >
            {label}
          </a>
          <div className='dropdown-menu dropdown-menu-3 dropdown-menu-2'>
            <div className='row'>
              {dropdownContent.map((col: any, idx: number) => (
                <div className='col-xl-3' key={idx}>
                  <div className='dropdown-column m-0'>
                    <h5 className='dropdown-header'>{col.header}</h5>
                    {col.items.map((item: string, i: number) => (
                      <a className='dropdown-item' href='/' key={i}>
                        {item}
                      </a>
                    ))}
                    {col.subHeader && (
                      <h5 className='custom-mt dropdown-header'>{col.subHeader}</h5>
                    )}
                    {col.subItems &&
                      col.subItems.map((item: any, i: number) =>
                        typeof item === 'string' ? (
                          <a className='dropdown-item' href='/' key={i}>
                            {item}
                          </a>
                        ) : (
                          <a className='dropdown-item' href={item.href} key={i}>
                            {item.label}
                            {item.hot && <label className='menu-label warning-label'>Hot</label>}
                          </a>
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
          <Link className='nav-link dropdown-toggle ps-xl-2 ps-0' to='/' data-bs-toggle='dropdown'>
            {label}
          </Link>
          <ul className='dropdown-menu'>
            {dropdownMenu.map((item: any, idx: number) => (
              <li key={idx}>
                {item.to ? (
                  <Link className='dropdown-item' to={item.to}>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    className='dropdown-item'
                    href='javascript:void(0)'
                    onClick={() => onJoinClick && onJoinClick(item.label)}
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
              {navItems.map((item, idx) =>
                item.type === 'dropdown' && item.label === 'Join Apsra' && !isAuthenticated ? (
                  <DropdownNavItem key={idx} {...item} onJoinClick={handleJoinClick} />
                ) : item.type === 'dropdown' && item.label !== 'Join Apsra' ? (
                  <DropdownNavItem key={idx} {...item} />
                ) : item.type !== 'dropdown' ? (
                  <NavItem key={idx} {...item} />
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
