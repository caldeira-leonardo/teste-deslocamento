import React from 'react';
import { BottomIcons } from './styleModal';
import Button from '../Button/Button';

interface BottonButtonsProps {
  onClose(): void;
  onConfirm(): void;
}

const BottonButtons = ({ onClose, onConfirm }: BottonButtonsProps) => {
  return (
    <BottomIcons>
      <Button color="error" onClick={onClose}>
        Cancelar
      </Button>
      <Button onClick={onConfirm} style={{ marginLeft: '20px' }}>
        Confirmar
      </Button>
    </BottomIcons>
  );
};

export default BottonButtons;
