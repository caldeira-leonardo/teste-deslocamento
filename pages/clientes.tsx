import Client from '@/src/components/Client/container/client';
import DashboardLayout from '@/src/components/DashboardLayout/dashboardLayout';

const Component = () => {
  return (
    <DashboardLayout title="Clientes">
      <Client />
    </DashboardLayout>
  );
};

export default Component;
