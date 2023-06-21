import React from 'react';
import Modal from '@mui/material/Modal';
import {
  ModalContentWrapper,
  ModalWrapper,
  CloseIconButton,
  MainIconWrapper,
  BottomIcons,
} from './styleModal';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@/src/components/elements/Button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
  title: string;
  description: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalWrapper>
        <ModalContentWrapper>
          <CloseIconButton onClick={onClose} />
          <MainIconWrapper>
            <DeleteIcon style={{ fontSize: '50px', color: '#f44336' }} />
          </MainIconWrapper>
          <h2 style={{ textAlign: 'center' }}>{title}</h2>
          <h4 style={{ textAlign: 'center' }}>{description}</h4>
          <BottomIcons>
            <Button color="error" onClick={onClose}>
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

export default ConfirmationModal;
