import React from 'react';
import {
  TextField,
  BaseTextFieldProps,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ErrorLabel, InputWrapper } from './styleInput';

interface InputProps extends BaseTextFieldProps {
  formik: any;
  id: string;
  type?: string;
  options?: {
    key: string | number;
    label: string;
  }[];
}

interface formikProps {
  value: string | number;
  error: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const Input = (props: InputProps) => {
  const { id, formik, type, options } = props;
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

  const handleSelectOption = (value: string | number) => {
    const selectedOption = options?.filter((option) => option.key === value)[0];
    formik.setFieldValue(id, selectedOption);
  };

  return (
    <InputWrapper>
      {type === 'select' ? (
        <FormControl fullWidth>
          <InputLabel color="secondary" id={formik.values[id].label}>
            {props.label}
          </InputLabel>
          <Select
            {...formikProps}
            variant="outlined"
            color="secondary"
            labelId={formik.values[id].label}
            id={id}
            label={props.label}
            value={formik.values[id].key}
            onChange={(e) => handleSelectOption(e.target.value)}
          >
            {options?.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          {...props}
          {...formikProps}
          variant="outlined"
          onChange={(e) => formik.setFieldValue(id, e.target.value)}
          onBlur={handleBlur}
        />
      )}

      {formikProps.error && <ErrorLabel>{formik?.errors[id]}</ErrorLabel>}
    </InputWrapper>
  );
};

export default Input;
