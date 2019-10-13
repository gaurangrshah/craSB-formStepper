import React, { useState, useRef } from 'react';

// needs access to values / set values

export const FormContext = React.createContext();
const FormComp = ({ children }) => {
  const FormRef = useRef();
  const getFormVals = () => {
    let formVal = FormRef.current[0];
    return formVal;
  };

  const updateFormInputValue = e => {
    e.preventDefault();
    const currVals = getFormVals();
    let { name, value } = currVals;
    setValues({ ...values, [name]: value });
  };
  return (
    <FormContext.Provider>
      <form ref={FormRef} onSubmit={updateFormInputValue}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default FormComp;
