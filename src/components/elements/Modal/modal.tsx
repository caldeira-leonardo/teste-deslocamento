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
  onCancel(): void;
  title: string;
  children: React.ReactNode;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
}: CustomModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalWrapper>
        <ModalContentWrapper>
          <CloseIconButton onClick={onClose} />
          <h3>{title}</h3>
          <Divider />
          {children}
        </ModalContentWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default CustomModal;
