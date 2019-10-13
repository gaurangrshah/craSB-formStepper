import React, { useState, useEffect } from 'react'

export const useSteps = initialStepLength => {
  const [step, setStep] = useState({
    total: initialStepLength,
    currSte: 0,
    max: initialStepLength - 1,
    submitted: false
  })

  let { currStep, total, max, submitted } = step;

  useEffect(() => {
    console.log('useSteps:::Effect::: ', step, step.currStep)
  }, [step])

  const handleSubmit = action => {
    if (action === 'prev') return setStep({ ...step, currStep: currStep - 1 })
    if (action === 'next') return setStep({ ...step, currStep: currStep + 1 })
    if (action === 'submit') return setStep({ ...step, currStep: 0 })
  }

  const renderPrev = () => (
    <>
      {currStep !== total && (currStep !== 0 && currStep !== max && (
        <button type="button" onClick={() => handleSubmit('prev')}>Prev</button>
      ))}
    </>
  )

  const renderNext = () => (
    <>
      {currStep !== max && (currStep !== total && (
        <button type="button" onClick={() => handleSubmit('next', true)}>Prev</button>
      ))}
    </>
  )

  const renderSubmit = () => (
    <>
      {currStep !== total && (currStep === max && (
        <button type="button" onClick={() => handleSubmit('submit')}>Prev</button>
      ))}
    </>
  )

  return {
    step,
    handleSubmit,
    renderPrev,
    renderNext,
    renderSubmit
  }
}
