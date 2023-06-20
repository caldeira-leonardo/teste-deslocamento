import React from 'react';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';

import {
  BottomIcons,
  CloseIconButton,
  ModalContentWrapper,
  ModalWrapper,
} from './styleModal';
import Button from '../Button/Button';

interface CustomModalProps {
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
  onCancel(): void;
  title: string;
  children: React.ReactNode;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  onCancel,
  onConfirm,
  children,
}: CustomModalProps) => {
  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalWrapper>
        <ModalContentWrapper>
          <CloseIconButton onClick={onClose} />
          <h3>{title}</h3>
          <Divider />
          {children}
          <BottomIcons>
            <Button color="error" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={onConfirm} style={{ marginLeft: '20px' }}>
              Confirmar
            </Button>
          </BottomIcons>
        </ModalContentWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default CustomModal;
