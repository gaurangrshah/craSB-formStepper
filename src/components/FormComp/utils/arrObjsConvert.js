// utility to convert an array of objects into a single object with specified fields:
export const newObject = arrOfObjs => {
  // map thru each object and...
  let newArrOfObjs = arrOfObjs.map(({ name, value }) => ({
    // return the name, value fields for each object as a new object:
    [name]: value
  }));
  const values = Object.assign({}, ...newArrOfObjs);
  // create a new object with the returned values
  return values;
};
