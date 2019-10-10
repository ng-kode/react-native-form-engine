import React, {useState} from 'react';

const Field = ({fromEngine, customize, Component}) => {
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  return (
    <Component
      testID="form-engine-field"
      fromEngine={{
        ...fromEngine,
        onBlur: () => setTouched(true),
        touched,
        dirty,
        onChange: value => {
          setDirty(true);
          fromEngine.onChange(value);
        },
      }}
      customize={customize}
    />
  );
};

export default Field;
