import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const DashboardWrapper = styled(Box)`
  padding: 25px;

  grid-template-columns: 240px 1fr;
  gap: 25px;
  height: 100vh;
`;

export const DashboardContainer = styled(Box)`
  height: 100%;
  box-sizing: border-box;
`;

export const DashboardTitle = styled.h1`
  height: 48px;
`;

export const DashboardChildren = styled(Box)`
  padding: 25px 0;
  height: calc(100% - 90px);
`;
