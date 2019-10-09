// import React, { useState, useEffect, useMemo } from 'react';
// import FormProvider, { FormContext } from '../Context/FormContext';
// import { views } from '../../../db/views';

// export const FormContext = React.createContext();

// export const FormProvider = ({ children }) => {
//   const createFormState = views.map(obj => {
//     delete obj.id;
//     delete obj.type;
//     return obj;
//   });

//   const [formState, setFormState] = useState(null);
//   // const [effectCount, setEffectCount] = useState({ count: 0 });

//   const updateFormState = e => {
//     console.log('runUpdateFormState');
//     // setFormState(viewViews);
//   };

//   useEffect(() => {
//     // if (effectCount === 5) return null;
//     // setEffectCount({ ...effectCount, count: count + 1 });
//     if (!formState) {
//       console.log('should only run once');
//       return setFormState(createFormState).then(data =>
//         console.log(formState, data)
//       );
//     }
//   }, []);

//   return (
//     <FormProvider value={{ formState, updateFormState }}>
//       {children}
//     </FormProvider>
//   );
// };
