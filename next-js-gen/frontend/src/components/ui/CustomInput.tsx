import React, { useEffect } from 'react';
import { useField } from 'formik';
import { Input } from 'baseui/input';
import { Badge } from 'baseui/badge';

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <Badge
      placement={'topRightEdge'}
      content={meta.error}
      color={'negative'}
      shape={'pill'}
      hidden={!meta.touched || (!meta.error && meta?.error?.length !== 0)}
      overrides={{
        Root: {
          style: {
            width: '100%',
          },
        },
      }}
    >
      <Input
        {...field}
        {...props}
        placeholder={label}
        error={meta.touched && !!meta.error}
      />
    </Badge>
  );
};

export default CustomInput;
