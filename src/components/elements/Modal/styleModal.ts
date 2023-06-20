import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const ModalWrapper = styled(Box)`
  /* width: min-content; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

export const ModalContentWrapper = styled(Box)`
  position: relative;
  padding: 20px;
  background-color: ${colors.textLight};
  border-radius: 12px;
  width: max-content;
  box-sizing: border-box;
  overflow: auto;
  max-height: 90vh;
`;

export const MainIconWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseIconButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const BottomIcons = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
