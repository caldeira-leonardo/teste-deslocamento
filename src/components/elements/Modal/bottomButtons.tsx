import React from 'react';
import { BottomIcons } from './styleModal';
import Button from '../Button/Button';

interface BottonButtonsProps {
  onClose(): void;
  onConfirm(): void;
  disabled: boolean;
}

const BottonButtons = ({
  onClose,
  onConfirm,
  disabled,
}: BottonButtonsProps) => {
  return (
    <BottomIcons>
      <Button color="error" onClick={onClose}>
        Cancelar
      </Button>
      <Button
        onClick={onConfirm}
        style={{ marginLeft: '20px' }}
        disabled={disabled}
      >
        Confirmar
      </Button>
    </BottomIcons>
  );
};

export default BottonButtons;
