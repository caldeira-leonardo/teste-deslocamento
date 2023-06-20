import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import AirlineSeatReclineExtraRoundedIcon from '@mui/icons-material/AirlineSeatReclineExtraRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  IconButton,
  Drawer,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  IconContainer,
  ItemWrapper,
  ListWrapper,
  MenuListWrapper,
  ToolBarCustom,
} from './styleMenu';
import Link from 'next/link';

const Menu = () => {
  const path = useRouter().asPath;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsOpen((value) => !value);
  };

  const ListWrapperElement = () => {
    return (
      <ListWrapper>
        {menuList.map((item) => {
          return (
            <Link key={item.name} href={item.path}>
              <ItemWrapper
                onClick={item.onClick}
                key={item.name}
                className={`${path.includes(item.path) ? 'active' : ''}`}
              >
                <IconContainer>{item.icon}</IconContainer>
                <ListItemText>{item.name}</ListItemText>
              </ItemWrapper>
            </Link>
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

const menuList = [
  {
    name: 'Cliente',
    icon: <ContactsRoundedIcon />,
    onClick: () => console.log('Cliente'),
    path: '/cliente',
  },
  {
    name: 'Condutores',
    icon: <AirlineSeatReclineExtraRoundedIcon />,
    onClick: () => console.log('Condutores'),
    path: '/condutores',
  },
  {
    name: 'Deslocamento',
    icon: <PersonPinCircleRoundedIcon />,
    onClick: () => console.log('Deslocamento'),
    path: '/deslocamento',
  },
  {
    name: 'Veiculos',
    icon: <LocalShippingRoundedIcon />,
    onClick: () => console.log('Veiculos'),
    path: '/veiculos',
  },
];
