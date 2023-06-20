import React from 'react';
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
} from '@mui/material';

interface ButtonProps extends MaterialButtonProps {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children } = props;

  return (
    <MaterialButton {...props} variant="contained">
      {children}
    </MaterialButton>
  );
};

export default Button;
