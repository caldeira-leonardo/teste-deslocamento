import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import CustomModal from './modal';
import { useState } from 'react';
import Button from '../Button/Button';
import VehicleForm from '../../Vehicles/components/vehiclesForm';
import { Global, css } from '@emotion/react';

const meta: Meta<typeof CustomModal> = {
  title: 'Components/Elements/Modal',
  component: CustomModal,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    title: 'Test Modal',
  },
  decorators: [
    (Story, options) => {
      const [isOpen, setIsOpen] = useState(options.args.isOpen);
      const onClose = () => {
        setIsOpen(false);
      };
      const title = options.args.title;

      const args = {
        ...options.args,
        isOpen,
        title,
        onClose,
        children: (
          <VehicleForm
            submit={() => {
              console.log('submit');
              onClose();
            }}
            handleClose={onClose}
            type="Create"
            resetSelectVehicle={() => {
              console.log('resetSelectVehicle');
              onClose();
            }}
          />
        ),
      };

      return (
        <>
          <ThemeProvider theme={theme}>
            <Global styles={styles} />
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Story args={args}></Story>
          </ThemeProvider>
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CustomModal>;

export const Default: Story = {};

const styles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }

  * {
    box-sizing: border-box;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgb(228, 228, 228);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(192, 192, 192);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(170, 170, 170);
  }
`;
