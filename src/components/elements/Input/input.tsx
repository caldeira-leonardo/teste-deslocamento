import React, { useEffect } from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material';
import { ErrorLabel } from './styleInput';

interface InputProps extends BaseTextFieldProps {
  formik: any;
  id: string;
}

const Input = (props: InputProps) => {
  const { id, formik } = props;

  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        error={formik?.errors[id] || ''}
      />
      <ErrorLabel>{formik?.errors[id]}</ErrorLabel>
    </>
  );
};

export default Input;
