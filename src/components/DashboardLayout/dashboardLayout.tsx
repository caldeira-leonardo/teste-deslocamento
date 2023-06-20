import Menu from '@/src/components/Menu/menu';
import { useMemo } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  DashboardChildren,
  DashboardContainer,
  DashboardTitle,
  DashboardWrapper,
} from './styleDashboardLayout';
import { Divider } from '@mui/material';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children, title } = props;
  const routerPath = useRouter().asPath;
  const path = useMemo(() => routerPath, []);

  return (
    <DashboardWrapper sx={{ display: { xs: 'block', md: 'grid' } }}>
      <Menu />
      <DashboardContainer>
        <DashboardTitle>{title}</DashboardTitle>
        <Divider />
        <DashboardChildren>{children}</DashboardChildren>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default DashboardLayout;
