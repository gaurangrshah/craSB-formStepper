import { useState, useEffect } from 'react';

export const useForm = valuesObject => {
  const [values, setValues] = useState(valuesObject);

  useEffect(() => {
    console.log('FormWrap:::Effect:: values', values);
  }, [values]);

  const updateValues = obj => {
    let { name, value } = obj;
    console.log('updateValues', name, value);
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    updateValues
  };
};
