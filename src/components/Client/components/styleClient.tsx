import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Button from '@/src/components/elements/Button/Button';

export const ClientWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const AddClientButton = styled(Button)`
  margin-left: auto;
  margin-bottom: 25px;
`;

export const ClientFormWrapper = styled(Box)`
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

export const ActionsWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ActionIcon = styled(Box)`
  margin: 0;
  padding: 0;
  margin-left: 15px;
  cursor: pointer;
`;

export const NoDataTableWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
`;
