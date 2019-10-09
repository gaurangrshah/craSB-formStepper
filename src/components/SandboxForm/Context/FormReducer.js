import React, { useContext, useReducer } from 'react';

export const FormContext = React.createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state + 1 };

    default:
      return state;
  }
};

const Increment = ({ initialCount }) => {
  const [state, dispatch] = useReducer(formReducer, { count: 0 });

  return (
    <button onClick={() => dispatch({ type: 'increment' })}>
      Increment: {state.count}
    </button>
  );
};
