import React, { useState, useEffect } from "react";

export const useSteps = (initialStepLength, callback) => {
  // gave access to currInputValue, to reference when handling submit, if needed.

  const [step, setStep] = useState({
    total: initialStepLength,
    currStep: 0,
    max: initialStepLength - 1,
    submitted: false
  });

  let { currStep, total, max, submitted } = step;

  useEffect(() => {
    console.log("useSteps:::Effect::: ", step);
  }, [step]);

  const handleSubmit = action => {
    if (action === "prev") return setStep({ ...step, currStep: currStep - 1 });
    if (action === "next") {
      setStep({ ...step, currStep: currStep + 1 });
      return callback ? callback() : null;
    }

    if (action === "submit") {
      setStep({ ...step, currStep: currStep + 1, submitted: !submitted });
      return callback ? callback() : null;
    }
  };

  const renderPrev = () => (
    <>
      {currStep !== total &&
        (currStep !== 0 && currStep !== max && (
          <button type="button" onClick={() => handleSubmit("prev")}>
            Prev
          </button>
        ))}
    </>
  );

  const renderNext = () => (
    <>
      {currStep !== max &&
        (currStep !== total && (
          <button type="button" onClick={() => handleSubmit("next", true)}>
            Next
          </button>
        ))}
    </>
  );

  const renderSubmit = () => (
    <>
      {currStep !== total &&
        (currStep === max && (
          <button type="button" onClick={() => handleSubmit("submit")}>
            Submit
          </button>
        ))}
    </>
  );

  return {
    step,
    renderPrev,
    renderNext,
    renderSubmit,
    handleSubmit
  };
};
