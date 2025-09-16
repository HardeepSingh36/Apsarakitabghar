import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardMain from '../../components/dashboard/DashboardMain';
import { useState } from 'react';

const UserDashboardSection: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <section className='user-dashboard-section section-b-space'>
      <div className='container-fluid-lg'>
        <div className='row'>
          {/* Sidebar */}
          <div className='col-xxl-3 col-lg-4'>
            <DashboardSidebar show={sidebarVisible} onClose = {() => setSidebarVisible(false)}/>
          </div>
          {/* Main Content (Dashboard) */}
          <div className='col-xxl-9 col-lg-8'>
            <button
              className='btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none'
              onClick={() => setSidebarVisible(true)}
            >
              Show Menu
            </button>
            <DashboardMain />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboardSection;
