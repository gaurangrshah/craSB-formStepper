import React, { useState, useEffect, useRef } from 'react';

export const useForm = (defaultValues, getter) => {
  const { values, setValues } = useState(defaultValues);

  useEffect(() => {
    console.log('❌useForm::: useEffect::: values:', values);
  }, [values]);

  const msg = 'ty';

  const updateFormInputValue = () => {
    const currVals = getter();
    console.log('currVals', currVals);
    return currVals;
  };

  return {
    values,
    updateFormInputValue,
    msg
  };
};
