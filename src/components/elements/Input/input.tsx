import React from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material';
import { ErrorLabel, InputWrapper } from './styleInput';

interface InputProps extends BaseTextFieldProps {
  formik: any;
  id: string;
}

interface formikProps {
  value: string | number;
  error: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const Input = (props: InputProps) => {
  const { id, formik } = props;
  let formikProps: formikProps = {
    value: '',
    error: false,
  };

  if (formik) {
    formikProps = {
      value: formik.values[id],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => formik.setFieldValue(id, e.target.value),
      error: formik.touched[id] && formik.errors[id],
    };
  }

  const handleBlur = () => {
    formik.setTouched({ ...formik.touched, [id]: true });
  };

  return (
    <InputWrapper>
      <TextField
        {...props}
        {...formikProps}
        defaultValue={formik.values[id]}
        variant="outlined"
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        onBlur={handleBlur}
      />
      {formikProps.error && <ErrorLabel>{formik?.errors[id]}</ErrorLabel>}
    </InputWrapper>
  );
};

export default Input;
