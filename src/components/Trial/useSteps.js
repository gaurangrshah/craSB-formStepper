import React, { useState, useEffect } from 'react';

export const useSteps = initialStepLength => {
  const [step, setStep] = useState({
    total: initialStepLength,
    currStep: 0,
    max: initialStepLength - 1,
    submitted: false
  });

  useEffect(() => {
    step.max = step.total - 1;
    console.log('useSteps::: useEffect::', step, step.currStep);
  }, [step]);

  const handleSubmit = action => {
    let { currStep } = step;
    if (action === 'prev') return setStep({ ...step, currStep: currStep - 1 });
    if (action === 'next') return setStep({ ...step, currStep: currStep + 1 });
    if (action === 'submit') return setStep({ ...step, currStep: 0 });
  };

  const renderPrev = () => {
    return (
      <>
        {step.currStep !== step.total &&
          (step.currStep !== 0 && step.currStep !== step.max && (
            <button type="button" onClick={() => handleSubmit('prev', false)}>
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
          {step.currStep !== step.max &&
            (step.currStep !== step.total && (
              <button type="button" onClick={() => handleSubmit('next', true)}>
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
          (step.currStep === step.max && (
            <button type="button" onClick={() => handleSubmit('submit')}>
              submit
            </button>
          ))}
      </>
    );
  };

  return {
    step,
    handleSubmit,
    renderPrev,
    renderNext,
    renderSubmit
  };
};
