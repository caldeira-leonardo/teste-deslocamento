import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Elements/Button',
  tags: ['autodocs'],
  args: {
    color: 'primary',
    children: 'Button',
  },
  argTypes: {
    onClick: {
      action: 'Button clicked',
    },
  },
  decorators: [
    (Story) => (
      <>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondaty: Story = {
  args: {
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
