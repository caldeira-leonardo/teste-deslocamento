import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import Input from './input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const meta: Meta<typeof Input> = {
  title: 'Components/Elements/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    color: 'primary',
  },
  decorators: [
    (Story, options) => {
      const formik = useFormik<{ name: string; key: number; }>({
        initialValues: {
          key: 0,
          name: '',
        },
        validationSchema: Yup.object().shape({
          key: Yup.number(),
          name: Yup.string().required('Mandatory field'),
        }),
        onSubmit: async (values: { name: string; key: number; }) => {
          console.log('Form sended', values);
          formik.resetForm();
        },
      });

      const inputOptions = [
        {
          label: 'teste 1',
          key: 1,
        },
        {
          label: 'teste 2',
          key: 2,
        },
        {
          label: 'teste 3',
          key: 3,
        },
      ];

      const args = {
        ...options.args,
        formik: formik,
        label: 'Name',
        id: 'name',
        options: inputOptions,
      };

      return (
        <>
          <ThemeProvider theme={theme}>
            <Story args={args} />
          </ThemeProvider>
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Select: Story = {
  args: {
    type: 'select',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
