import React, { useContext } from 'react';
import { views } from '../../db/views';

const Form = ({ children }) => {
  const handleSubmit = e => {
    e.preventDefault();

    let { name, value } = e.target;

    if (e.keycode === 13) {
      console.log('enter pressed', name, value);
    }

    console.log('form: handleSubmit: running', name, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        autoComplete="off"
        onKeyUp={handleSubmit}
      />
      {children}
    </form>
  );
};

export default Form;
