
function getResponseErrorsObject(responseErrorsArray = []) {
  let responseErrorsObject = {};
  // eslint-disable-next-line no-plusplus
  for (let errorIndex = 0; errorIndex < responseErrorsArray.length; errorIndex++) {
    responseErrorsObject = { ...responseErrorsArray[errorIndex], ...responseErrorsObject };
  }
  return { responseErrorsObject, responseErrorsArray };
}

export default function getResponseErrors(responseData, responseErrorsArray = []) {
  // eslint-disable-next-line no-restricted-syntax
  for (const responsePropertyKey in responseData) {
    // Check if the response data object is NOT a primitive value. i.e it's an Array or Object
    // We call the recursive case in this block
    if (
    // eslint-disable-next-line no-prototype-builtins
      responseData.hasOwnProperty(responsePropertyKey)
        && typeof responseData[responsePropertyKey] !== 'string'
        && typeof responseData[responsePropertyKey] !== 'number'
        && typeof responseData[responsePropertyKey] !== 'boolean') {
      // Check if the current property is an Array object
      if (Array.isArray(responseData[responsePropertyKey]) && typeof responseData[responsePropertyKey] !== 'string') {
        let propertyArrayItem;
        for (propertyArrayItem = 0;
          propertyArrayItem < responseData[responsePropertyKey].length;
        // eslint-disable-next-line no-plusplus
          propertyArrayItem++) {
          if (typeof responseData[responsePropertyKey][propertyArrayItem] === 'string') {
            responseErrorsArray.push(
              { [responsePropertyKey]: responseData[responsePropertyKey][propertyArrayItem] },
            );
            // eslint-disable-next-line no-continue
            continue;
          }
          // Check the kind of object the current array-item is.
          getResponseErrors(responseData[responsePropertyKey][propertyArrayItem],
            responseErrorsArray);
        }
      //  Check if the current key is an object variable
      } else if (responseData[responsePropertyKey] !== null
          && typeof responseData[responsePropertyKey] === 'object'
      ) {
        getResponseErrors(responseData[responsePropertyKey], responseErrorsArray);
      }
    //  It's a string (which is good) add this string and it to the array of key: value errors;
    } else {
      // Add the key and value of the string for the error found
      responseErrorsArray.push({ [responsePropertyKey]: responseData[responsePropertyKey] });
    }
  }
  return getResponseErrorsObject(responseErrorsArray);
}
