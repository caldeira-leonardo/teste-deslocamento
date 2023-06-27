import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Button from '../../elements/Button/Button';

export const ChecklistWrapper = styled(Box)`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

export const HeaderButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 25px;
`;

export const AddDeslocButton = styled(Button)`
  width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
