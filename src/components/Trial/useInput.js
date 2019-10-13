import React, { useState, useEffect } from 'react';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    console.log('useInput::inputValue', value);
    return () => {};
  }, [value]);

  const bind = {
    value,
    onChange: e => updateInput(e.target.value, e),
    onKeyUp: e => (e.keycode === 13 ? updateInput(e.target.value, e) : null),
    autoComplete: 'off'
  };

  const setupStepInput = (arrInputs, currIndex, render) => {
    if (render && currIndex !== arrInputs.length) {
      console.log('setupStepInput::', { ...arrInputs[currIndex] });
      return renderInput(arrInputs[currIndex]);
    }
    return null; // render nothing when not specified.
  };

  const renderInput = obj => {
    if (obj.name && obj.type) {
      let { name, type } = obj;
      return <input name={name} placeholder={name} type={type} {...bind} />;
    }
  };

  const updateInput = (newVal, e) => {
    if (e) {
      e.preventDefault();
    }
    return setValue(newVal);
  };

  return {
    bind,
    reset: () => setValue(''),
    value,
    updateInput,
    setupStepInput
  };
};
