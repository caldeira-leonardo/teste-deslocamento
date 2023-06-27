import React, { useEffect } from 'react';
import {
  TextField,
  BaseTextFieldProps,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CustomTimePicker, ErrorLabel, InputWrapper } from './styleInput';
import { renderTimeViewClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
interface InputProps extends BaseTextFieldProps {
  formik?: any;
  id: string;
  type?: string;
  readOnly?: boolean;
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
      {type === 'select' && (
        <FormControl fullWidth>
          <InputLabel color="secondary" id={formik.values[id].label}>
            {props.label}
          </InputLabel>
          <Select
            {...formikProps}
            variant="outlined"
            onBlur={handleBlur}
            color="secondary"
            readOnly={props.readOnly}
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
      )}
      {type === 'fullDate' && (
        <CustomTimePicker
          onChange={(e: any) =>
            formik.setFieldValue(
              id,
              dayjs(e).format('YYYY-MM-DD[T]HH:mm:ss[.000Z]'),
            )
          }
          disabled={props.disabled}
          label={props.label}
          readOnly={props.readOnly}
          format="DD/MM/YYYY LTS"
          value={formik.values[id] ? dayjs(formik.values[id]) : null}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      )}
      {(type === 'text' || type === 'date' || !type) && (
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
