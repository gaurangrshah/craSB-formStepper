import React, { useContext } from 'react';
import { views } from '../../db/views';
import { newObject } from './arrObjsConvert';
import { useInput } from './useInput';
import { useSteps } from './useSteps';
import { useForm } from './useForm';

const FormRef = React.createContext;
const RenderComp = () => {
  const { setupStepInput } = useInput('');

  const { step, handleSubmit, renderPrev, renderNext, renderSubmit } = useSteps(
    views.length
  );

  const getVals = () => {
    let formVal = FormRef.current[0];
    return formVal;
  };

  const initialFormVals = newObject(views);

  const { values, updateFormInputValue, msg } = useForm(
    initialFormVals,
    getVals
  );

  console.log('vals', values);

  return (
    <>
      <form ref={FormRef} onSubmit={updateFormInputValue}>
        {renderPrev()}
        {setupStepInput(views, step.currStep, true)}
        {renderNext()}
        {renderSubmit()}
        {msg}
      </form>
    </>
  );
};

export default RenderComp;
