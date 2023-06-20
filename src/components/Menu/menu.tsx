import {
  IconButton,
  Toolbar,
  Drawer,
  ListItemText,
  Typography,
  Box,
  colors,
} from '@mui/material';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import AirlineSeatReclineExtraRoundedIcon from '@mui/icons-material/AirlineSeatReclineExtraRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import EmojiTransportationRoundedIcon from '@mui/icons-material/EmojiTransportationRounded';

import { useState } from 'react';
import {
  IconContainer,
  ItemWrapper,
  ListWrapper,
  MenuListWrapper,
  ToolBarCustom,
} from './styleMenu';

const Menu = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsOpen((value) => !value);
  };

  const list = [
    {
      name: 'Cliente',
      icon: <ContactsRoundedIcon />,
      onClick: () => console.log('Cliente'),
    },
    {
      name: 'Condutores',
      icon: <AirlineSeatReclineExtraRoundedIcon />,
      onClick: () => console.log('Condutores'),
    },
    {
      name: 'Deslocamento',
      icon: <PersonPinCircleRoundedIcon />,
      onClick: () => console.log('Deslocamento'),
    },
    {
      name: 'Veiculos',
      icon: <LocalShippingRoundedIcon />,
      onClick: () => console.log('Veiculos'),
    },
  ];

  const ListWrapperElement = () => {
    return (
      <ListWrapper>
        {list.map((item) => {
          return (
            <ItemWrapper onClick={item.onClick} key={item.name}>
              <IconContainer>{item.icon}</IconContainer>
              <ListItemText>{item.name}</ListItemText>
            </ItemWrapper>
          );
        })}
      </ListWrapper>
    );
  };

  return (
    <>
      <ToolBarCustom sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton onClick={toggleDrawer}>
          <MenuRoundedIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Typography>Logo</Typography>
      </ToolBarCustom>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
          height: '100vh',
        }}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          variant: 'outlined',
          style: {
            backgroundColor: 'transparent',
            border: '1px solid #080c22',
          },
        }}
      >
        <MenuListWrapper style={{ borderRadius: 0 }}>
          <ListWrapperElement />
        </MenuListWrapper>
      </Drawer>

      <MenuListWrapper sx={{ display: { xs: 'none', md: 'block' } }}>
        <ListWrapperElement />
      </MenuListWrapper>
    </>
  );
};

export default Menu;
