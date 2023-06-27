import type { NextPage } from 'next';
import DashboardLayout from '@/src/components/DashboardLayout/dashboardLayout';

const Home: NextPage = () => {
  return (
    <DashboardLayout title="Instruções">
      <h2 style={{ textAlign: 'center' }}>Instruções da aplicação</h2>

      <ul>
        <li>
          O menu ao lado foi feito para a navegação dentro de cada uma das rotas
          que compoem a aplicação
        </li>
        <li>
          Cada uma das Seis rotas estão contidas na pasta pages, em seu
          respectivo &quot;diretório&quot;
        </li>
        <li>
          Além da página de início, somente a pagina de erros não está contida
          no menú
        </li>
        <li>
          Todas as páginas tem &quot;as mesmas&quot; funcionalidades, sendo
          elas: um título, um botão e uma tabela (para a página de deslocamento
          foi necessário adicionar mais um botão para um melhor fluidex dos
          elementos e conteúdo da página )
        </li>
        <li>
          O Título da página é inserido no componente {'<DashboardLayout />'},
          onde também está contido o menu da aplicação
        </li>
        <li>
          Os elementos da aplicação também foram criados para aderir ao conceito
          mobile first e são responsivos
        </li>
        <li>
          Foi adicionado uma documentação para os elementos que são reutilizados
          na aplicação, foi utilizado a biblioteca Storybook para a
          documentação, para rodar a documentação na web basta abrir o terminar
          e inserir &quot;npm storybook&quot; ou &quot;yarn storybook&quot;
        </li>
        <li>
          Na página da documentação é possível testar os elementos dos
          componentes antes de utiliza-los, deixando mais facil o entendimento
          da necessidade de cada propriedade do mesmo
        </li>
      </ul>
    </DashboardLayout>
  );
};

export default Home;
