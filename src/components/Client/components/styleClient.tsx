import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ClientFormWrapper = styled(Box)`
  min-width: 400px;
  padding: 25px 0;

  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const LogradouroWrapper = styled(Box)`
  grid-template-columns: 1fr 80px;
  gap: 20px;

  grid-template-areas: 'logradouro numero';
`;
