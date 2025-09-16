import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import UserDashboardSection from './UserDashboardSection';

const Dashboard: React.FC = () => (
  <>
    <Breadcrumb
      title='User Dashboard'
      items={[
        { label: '', href: '/', iconClass: 'fa-solid fa-house' },
        { label: 'User Dashboard' },
      ]}
    />
    <UserDashboardSection />
  </>
);

export default Dashboard;
