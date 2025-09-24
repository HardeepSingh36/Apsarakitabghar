import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardMain from '../../components/dashboard/DashboardMain';
import { useState } from 'react';
import { Menu } from 'react-feather';
import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { Link } from 'react-router-dom';
import HeaderTop from '@/components/HeaderTop';

const UserDashboardSection: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <header className=''>
        <HeaderTop />

        <div className='top-nav top-header sticky-header'>
          <div className='container-fluid-lg'>
            <div className='row'>
              <div className='col-12'>
                <div className='navbar-top'>
                  <Link to='/' className='web-logo nav-logo'>
                    <img src='/assets/logo/apsra.svg' className='img-fluid lazyload' alt='' />
                  </Link>

                  <div className='rightside-box flex items-center gap-2'>
                    <h5>
                      Hello, <span className='lg:!block'>{user?.full_name}</span>
                    </h5>
                    <button
                      className='lg:hidden'
                      onClick={() => setSidebarVisible(!sidebarVisible)}
                    >
                      <Menu className='font-extrabold w-8 h-8' size={28} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className='user-dashboard-section section-b-space'>
        <div className='container-fluid-lg'>
          <div className='row'>
            {/* Sidebar */}
            <div className='col-xxl-3 col-lg-4'>
              <DashboardSidebar show={sidebarVisible} onClose={() => setSidebarVisible(false)} />
            </div>
            {/* Main Content (Dashboard) */}
            <div className='col-xxl-9 col-lg-8'>
              <DashboardMain />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboardSection;
