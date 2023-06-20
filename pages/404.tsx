import { useRouter } from 'next/router';
import { useMemo } from 'react';
const Component = (props: any) => {
  const routerPath = useRouter().asPath;
  const path = useMemo(() => routerPath, []);

  console.log('path', path); //TODO remove logs
  return <div>Pagina não encontrada: </div>;
};

export default Component;
