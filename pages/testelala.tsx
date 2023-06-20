import { useRouter } from 'next/router';

const Component = (props: any) => {
  const path = useRouter().asPath;

  return (
    <div>
      Pagina não encontrada: {path} - testelalatestelalatestelalatestelala
    </div>
  );
};

export default Component;
