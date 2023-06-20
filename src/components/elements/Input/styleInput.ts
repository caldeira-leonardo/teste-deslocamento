import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Box } from '@mui/material';

export const InputWrapper = styled(Box)`
  position: relative;
  margin-bottom: 20px;
`;

export const ErrorLabel = styled.label`
  position: absolute;
  left: 0;
  bottom: -25px;
  color: ${colors.error};
  padding-left: 4px;
`;
