import React from 'react';
import { Message } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import isEmpty from './is_empty';

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


export function getToastErrorDescription(errorMessage) {
  const errorList = [];
  if (typeof errorMessage === 'string') {
    errorList.push(errorMessage);
  } else {
    Object.keys(errorMessage)
      .forEach((key, index) => {
        if (Array.isArray(errorMessage[key])) {
          errorList.push(errorMessage[key][0]);
        }
        errorList.push(errorMessage[key]);
      });
  }

  const messageItems = errorList.map((messageItem, key) => (
    <Message.Item key={key}>
      {messageItem}
    </Message.Item>
  ));

  return messageItems;
}

export function setToastMessage(message, messageOptions = {
  type: '', // E.g 'info', 'warning', 'success', 'error'
  icon: '', // E.g 'mail'
  title: '', // E.g 'Authentication'
}) {
  const { type, icon, title } = messageOptions;
  if (!isEmpty(message) && typeof message !== 'string') {
    const { responseErrorsObject } = getResponseErrors(message);
    toast({
      type,
      icon,
      title,
      description: getToastErrorDescription(responseErrorsObject),
      animation: 'bounce',
      time: 10000,
    });
  }

  if (typeof message === 'string') {
    toast({
      type,
      icon,
      title,
      description: getToastErrorDescription(message),
      animation: 'bounce',
      time: 10000,
    });
  }
}
