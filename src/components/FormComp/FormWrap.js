import React from 'react';
import { views } from '../../db/views';
import { newObject } from './utils/arrObjsConvert';
import { useInput } from './utils/useInput';
import { useSteps } from './utils/useSteps';
import { useForm } from './utils/useForm';

const FormWrap = ({ children }) => {
  const inputs = newObject(views);
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
    <form>
      {renderPrev()}
      {setupStepInput(views, step.currStep, true)}
      {renderNext()}
      {children}
      {renderSubmit()}
    </form>
  );
};

export default FormWrap;
