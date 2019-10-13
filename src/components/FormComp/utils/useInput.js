import React, { useState, useEffect } from 'react';

// takes in current input and provides stateful functionality.

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue || '')

  useEffect(() => {
    console.log('useInput:::Effect::: input value: ', value)
  }, [value])


  const bind = {
    value,
    onChange: e => updateInput(e.target.value, e),
    onKeyUp: e => (e.keycode === 13) ? updateInput(e.target.value, e) : null,
    autoComplete: 'off'
  }

  const updateInput = (newVal, e) => {
    if (e) {
      e.preventDefault();
    }
    return setValue(newVal)
  }


  const renderInput = obj => {
    if (obj.name && obj.type) {
      let { name, type } = obj
      return <input name={name} placeholder={name} type={type} {...bind} />
    }
  }

  const setupStepInput = (arrInputs, currIndex, render) => {
    if (render && currIndex !== arrInputs.length) {
      console.log('setupStepInput::', { ...arrInputs[currIndex] });
      return renderInput(arrInputs[currIndex])
    }
  }
  return {
    reset: () => setValue(''),
    value,
    updateInput,
    setupStepInput,
    bind
  }
}
