import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardMain from '../../components/dashboard/DashboardMain';

const UserDashboardSection: React.FC = () => (
  <section className='user-dashboard-section section-b-space'>
    <div className='container-fluid-lg'>
      <div className='row'>
        {/* Sidebar */}
        <div className='col-xxl-3 col-lg-4'>
          <DashboardSidebar />
        </div>
        {/* Main Content (Dashboard) */}
        <div className='col-xxl-9 col-lg-8'>
          <button className='btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none'>
            Show Menu
          </button>
          <DashboardMain />
        </div>
      </div>
    </div>
  </section>
);

export default UserDashboardSection;
