import React, {useState} from 'react';

const Field = ({Component, onChange, ...rest}) => {
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  return (
    <Component
      testID="form-engine-field"
      onBlur={() => setTouched(true)}
      onChange={value => {
        setDirty(true);
        onChange(value);
      }}
      touched={touched}
      dirty={dirty}
      {...rest}
    />
  );
};

export default Field;
