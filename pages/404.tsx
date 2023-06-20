import DashboardLayout from '@/src/components/DashboardLayout/dashboardLayout';
import errorIcon from '@/src/assets/404error.png';
import Image from 'next/image';
import { Box } from '@mui/material';

const MissingPath = () => {
  return (
    <DashboardLayout title="Página não encontrada">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Image src={errorIcon} alt="error404" />
        <h3 style={{ display: 'flex', alignItems: 'center' }}>
          Não encontramos a página que você está procurando
        </h3>
        <h3>selecione uma das opções do menu ao lado para ser redirecionado</h3>
      </Box>
    </DashboardLayout>
  );
};

export default MissingPath;
