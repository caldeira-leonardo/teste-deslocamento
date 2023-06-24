import DashboardLayout from '@/src/components/DashboardLayout/dashboardLayout';
import Vehicles from '@/src/components/Vehicles/containers/vehicles';

const Component = () => {
  return (
    <DashboardLayout title="Veículos">
      <Vehicles />
    </DashboardLayout>
  );
};

export default Component;
