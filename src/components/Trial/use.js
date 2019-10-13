import React, { useState, useEffect, useRef } from 'react';
import { newObject } from './arrObjsConvert';
import { views } from '../../db/views';

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

// // const stepContext = React.createContext;
// export const useSteps = () => {
//   // const setStepState = arr => ({
//   //   total: 5,
//   //   max: 5 - 1,
//   //   currStep: 0,
//   //   submitted: false
//   // });

//   const [step, setStep] = useState({
//     total: 5,
//     max: 4,
//     currStep: 0,
//     submitted: false
//   });

//   // useEffect(() => {
//   //   // console.log('useEffect::', step, step.currStep);
//   // }, [step]);

//   const handleSubmit = action => {
//     let { currStep } = step;
//     if (action === 'prev') return setStep({ ...step, currStep: currStep - 1 });
//     if (action === 'next') return setStep({ ...step, currStep: currStep + 1 });
//     if (action === 'submit') return setStep({ ...step, currStep: 0 });
//   };

//   // const renderPrev = () => {
//   //   return (
//   //     <>
//   //       {step.currStep !== step.total &&
//   //         (step.currStep !== 0 && step.currStep !== step.total - 1 && (
//   //           <button type="button" onClick={() => handleSubmit('prev', false)}>
//   //             prev
//   //           </button>
//   //         ))}
//   //     </>
//   //   );
//   // };

//   // const renderNext = () => {
//   //   return (
//   //     <>
//   //       {step.currStep !== step.total - 1 &&
//   //         (step.currStep !== step.total && (
//   //           <button type="button" onClick={() => handleSubmit('next', true)}>
//   //             next
//   //           </button>
//   //         ))}
//   //     </>
//   //   );
//   // };

//   // const renderSubmit = () => {
//   //   return (
//   //     <>
//   //       {step.currStep !== step.total &&
//   //         (step.currStep === step.total - 1 && (
//   //           <button type="button" onClick={() => handleSubmit('submit')}>
//   //             submit
//   //           </button>
//   //         ))}
//   //     </>
//   //   );
//   // };

//   return {
//     step,
//     handleSubmit,
//     renderPrev,
//     renderNext,
//     renderSubmit
//   };
// };

const TestComp = props => {
  const FormRef = useRef();

  const [values, setValues] = useState(newObject(views));

  const [step, setStep] = useState();

  const msg = 'Thanks Broski';

  const {
    bind: bindInput,
    reset,
    value: inputValue,
    updateInput,
    setupStepInput
  } = useInput('');

  useEffect(() => {
    console.log(FormRef.current);
    console.log('useEffect::', step, values, step.currStep);
  }, [step, values]);

  // const submitBeforeStep = () => {
  //   let formVal = FormRef.current[0];
  //   updateInput(formVal.value);
  //   return updateFormInputValue(null, formVal);
  // };

  const handleStep = (action, callback) => {
    if (
      action === 'prev' &&
      step.currStep !== 0 &&
      step.currStep !== step.total - 1
    ) {
      console.log('prev:: Stepper:: handleStep:: from::', step);
      setStep({ ...step, currStep: step.currStep - 1 });
      return callback ? callback() : null;
    }

    if (action === 'next' && step.currStep !== step.total - 1) {
      console.log('next:: Stepper:: handleStep:: from::', step);
      if (callback) {
        let formVal = FormRef.current[0];
        updateInput(formVal.value);
        updateFormInputValue(null, formVal);
      }
      reset();
      return setStep({ ...step, currStep: step.currStep + 1 });
    }

    if (action === 'submit') {
      console.log('submit:: Stepper:: handleStep:: from::', step);
      setStep({ ...step, currStep: step.currStep + 1 });
      return callback ? () => callback() : null;
    }
    if (action === 'submit') {
      reset();
      let formVal = FormRef.current[0];
      updateInput(formVal.value);
      updateFormInputValue(null, formVal);
      return setStep({ ...step, currStep: 0 });
    }

    return console.log('handleStep:: cannot complete:: ', action);
  };

  // ------------------------------------------------------------- ok
  const updateFormInputValue = (e, formVal) => {
    if (e) {
      e.preventDefault();
      // console.log(e.target[0].value);
      console.log('updateRef??', FormRef.current);
      let { name, value } = e.target[0];
      console.log(`UpdateFormInputValue:: ${name}: ${value}`);
      setValues({ ...values, [name]: value });
    } else if (formVal) {
      let { name, value } = formVal;
      console.log(`UpdateFormInputValue::FormVal:: ${name}: ${value}`);
      setValues({ ...values, [name]: value });
    }

    return setStep({ ...step, currStep: step.currStep + 1 });
  };

  // ------------------------------------------------------------- ok
  const keyupFormInputValue = e => {
    e.preventDefault();
    if (step.currStep < step.total) {
      if (e.keyCode === 13 || e.charCode === 13) {
        console.log('keyupform:::::>>>>', e.target);
        let { name, value } = e.target;
        setValues({ ...values, [name]: value });
        e.target.value = '';
        return setStep({ ...step, currStep: step.currStep + 1 });
      }
    }
  };

  const output = () => {
    if (step.currStep === step.total) {
      return (
        <>
          <p>{JSON.stringify(values, null, 2)}</p>
        </>
      );
    }
  };

  const renderPrev = () => {
    return (
      <>
        {step.currStep !== step.total &&
          (step.currStep !== 0 && step.currStep !== step.total - 1 && (
            <button type="button" onClick={() => handleStep('prev', false)}>
              prev
            </button>
          ))}
      </>
    );
  };

  const renderNext = () => {
    return (
      <>
        <>
          {step.currStep !== step.total - 1 &&
            (step.currStep !== step.total && (
              <button type="button" onClick={() => handleStep('next', true)}>
                next
              </button>
            ))}
        </>
      </>
    );
  };

  const renderSubmit = () => {
    return (
      <>
        {step.currStep !== step.total &&
          (step.currStep === step.total - 1 && (
            <button type="button" onClick={() => handleStep('submit')}>
              submit
            </button>
          ))}
      </>
    );
  };

  return (
    <>
      {/* {renderPrev()} */}
      <form
        ref={FormRef}
        onSubmit={updateFormInputValue}
        onKeyUp={keyupFormInputValue}
      >
        {setupStepInput(views, step.currStep, true)}
        {props.children}
      </form>
      {/* {renderNext()} */}
      {/* {renderSubmit()} */}
      {step.currStep === step.total && msg}
      <br />
      {output()}
    </>
  );
};

export default TestComp;
