import { Link } from 'react-router-dom';
import { useAuthDialog, type UserRole } from '@/context/AuthDialogContext';

const navItems = [
  {
    type: 'link',
    label: 'New',
    to: '/books',
    className: '',
    isDropdown: false,
  },
  { type: 'link', label: 'Trending', to: '/books', className: 'lg:!ml-4', isDropdown: false },
  // {
  //   type: 'dropdown',
  //   label: 'Books By Genre',
  //   className: 'dropdown lg:mx-2 lg:!ml-4',
  //   dropdownContent: [
  //     {
  //       header: 'Agriculture and Industry',
  //       items: [
  //         'Agriculture and Rural Affairs',
  //         'Allied Agricultural Occupations',
  //         'Crop & Horticulture',
  //         'Industrial Sectors',
  //         'Product Accordion',
  //       ],
  //       subHeader: 'Applied Arts',
  //       subItems: [
  //         'Advertising & Branding Design',
  //         'Architecture & Interior Design',
  //         'Digital Arts & New Media',
  //         'Fashion & Textile Design',
  //       ],
  //     },
  //     {
  //       header: 'Biographical Writings',
  //       items: [
  //         'Autobiographies & Memoirs',
  //         'Biographical Analyses & Work',
  //         'Biographie Artists & Writers',
  //         'Biographie Artists & Writers',
  //         'Biographie Artists & Writers',
  //         'Biographie Artists & Writers',
  //       ],
  //       subHeader: 'Health And Fitness',
  //       subItems: [
  //         'Mental Health & Well being',
  //         'Personal & Reproductive Health',
  //         'Physical Health & Fitness',
  //         'Public Health',
  //         'Child Health',
  //       ],
  //     },
  //     {
  //       header: 'History',
  //       items: [
  //         'Historiography & Historical Methods',
  //         'General & World History',
  //         'Indian History',
  //         'Religious History',
  //         'Specific History',
  //         'Regional History of India',
  //       ],
  //       subHeader: 'Career & Skill Development',
  //       subItems: [
  //         { label: 'Entrepreneurship & Business Skills', href: '/books' },
  //         { label: 'Job Market & Employment', href: '/' },
  //         { label: 'Professional & Vocational Training', href: '/books' },
  //         {
  //           label: 'Technology & Automation in Careers',
  //           href: '/books',
  //           hot: true,
  //         },
  //         { label: 'Workplace & Corporate Growth', href: '/books' },
  //       ],
  //     },
  //   ],
  // },
  {
    type: 'link',
    label: 'Popular',
    to: '/books',
    className: 'lg:!ml-4',
    isDropdown: false,
  },
  { type: 'link', label: 'Best Sellers', to: '/books', className: 'lg:!ml-4', isDropdown: false },
  {
    type: 'dropdown',
    label: 'Categories',
    className: 'dropdown dropdown-mega lg:!ml-4',
    dropdownMenu: [
      { label: 'Fiction', to: '/books' },
      { label: 'Non-Fiction', to: '/books' },
      { label: 'Science Fiction', to: '/books' },
      { label: 'Fantasy', to: '/books' },
      { label: 'Mystery', to: '/books' },
      { label: 'Biography', to: '/books' },
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
                <a
                  className='dropdown-item'
                  href='javascript:void(0)'
                  onClick={() => onJoinClick && onJoinClick(item.label)}
                >
                  {item.label}
                </a>
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
