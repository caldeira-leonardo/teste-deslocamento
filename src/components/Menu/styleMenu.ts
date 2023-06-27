import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Box, Toolbar } from '@mui/material';

export const MenuWrapper = styled(Box)`
  padding: 15px 15px;
  gap: 15px;
  display: grid;
`;

export const ListWrapper = styled(Box)`
  display: grid;
  gap: 25px;
`;

export const IconContainer = styled(Box)`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ToolBarCustom = styled(Toolbar)``;

export const ItemWrapper = styled(Box)`
  padding: 4px 15px;
  display: flex;
  align-items: center;
  /* cursor: pointer; */

  .MuiBox-root,
  .mui-style-10hburv-MuiTypography-root {
    color: ${colors.textLight};
  }

  &:hover,
  &.active {
    border-radius: 4px;
    background-color: ${colors.primary};

    .MuiBox-root,
    .mui-style-10hburv-MuiTypography-root {
      color: ${colors.secondary};
    }
  }
`;

export const MenuListWrapper = styled(Box)`
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.secondary};
  height: 100%;

  .mui-style-tzssek-MuiSvgIcon-root {
    font-size: 140px;
  }
`;
