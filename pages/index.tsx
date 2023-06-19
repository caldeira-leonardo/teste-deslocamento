import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Button } from '@mui/material';
import NewComponent from '@/src/components/Teste/teste';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => alert('aksjldkljasjdklasd')}
      >
        Teste
      </Button>
      <Button variant="contained" onClick={() => alert('aksjldkljasjdklasd')}>
        Teste2
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => alert('aksjldkljasjdklasd')}
      >
        Teste2
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => alert('aksjldkljasjdklasd')}
      >
        Teste2
      </Button>

      <NewComponent />
    </div>
  );
};

export default Home;
