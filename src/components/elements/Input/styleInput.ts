import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Box } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

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

export const CustomTimePicker = styled(DateTimePicker)`
  width: 100%;
  .mui-style-1qaa17u-MuiFormLabel-root-MuiInputLabel-root {
    &.Mui-focused {
      color: ${colors.secondary};
    }
  }

  .Mui-focused fieldset.MuiOutlinedInput-notchedOutline {
    border-color: ${colors.secondary};
  }
`;
