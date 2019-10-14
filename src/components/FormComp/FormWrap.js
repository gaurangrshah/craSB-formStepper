import React, { useRef } from 'react';
import { views } from '../../db/views';
import { newObject } from './utils/arrObjsConvert';
import { useInput } from './utils/useInput';
import { useSteps } from './utils/useSteps';
import { useForm } from './utils/useForm';

const FormWrap = ({ children }) => {
  const FormRef = useRef();

  const inputs = newObject(views);
  // console.log('FORMWRAP:', inputs);
  let currStep = 0;

  const { updateValues } = useForm({ ...inputs });

  const handleFormUpdates = (name, value) => {
    let newVals = { name, value };
    console.log('handleFormUpdates: ', newVals);
    return updateValues(newVals);
  };

  const { setupStepInput, reset } = useInput(
    inputs[currStep],
    handleFormUpdates
  );

  const { step, renderPrev, renderNext, renderSubmit } = useSteps(
    Object.keys(inputs).length,
    reset
  );

  currStep = step.currStep;

  return (
    <form ref={FormRef} onSubmit={handleFormUpdates}>
      {renderPrev()}
      {setupStepInput(views, step.currStep, true)}
      {renderNext()}
      {children}
      <button type="button" onClick={() => handleFormUpdates()}>
        submit
      </button>
      {renderSubmit()}
    </form>
  );
};

export default FormWrap;
