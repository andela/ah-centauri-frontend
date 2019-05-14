import React from 'react';
import PropTypes from 'prop-types';
import {Form, Message} from 'semantic-ui-react';

import isEmpty from '../../utils/is_empty';


const CustomForm = (props) => {
  const {
    className,
    size,
    errorMessage,
    loading,
    handleSubmit,
    inputFields,
    buttonName,
  } = props;

  const errorList = [];
  Object.keys(errorMessage)
    .forEach((key, index) => {
      if (Array.isArray(errorMessage[key])){
        errorList.push(errorMessage[key][0]);
      }
      errorList.push(errorMessage[key]);
    });

  return (
    <Form loading={loading} size={size} className={className} onSubmit={handleSubmit}>

      <Message
        visible={!isEmpty(errorMessage)}
        error
        header="There were some errors in your submission"
        list={errorList}
      />
      {inputFields.map((input, index) => {
        if (!Array.isArray(input)) {
          return (
            <Form.Input
              {...input}
              key={index}
            />
          );
        }
        // If the input field is an array then make a form group field
        // This is so we encase the items in the input array
        return (
          <Form.Group widths="equal" key={index}>
            {input.map((formGroupInput, formGroupIndex) => (
              <Form.Input
                {...formGroupInput}
                key={formGroupIndex}
              />
            ))}
          </Form.Group>
        );
      })}


      <Form.Button
        fluid
        primary
        inverted
        size="large"
        type="submit"
        id={`${buttonName}Button`}
      >
        {buttonName}
      </Form.Button>
    </Form>
  );
};

CustomForm.defaultProps = {
  className: '',
  size: 'small',
  loading: false,
  errorMessage: {},
  inputFields: [],
  buttonName: 'Change me',
};

CustomForm.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  inputFields: PropTypes.array.isRequired,
  errorMessage: PropTypes.object,
  loading: PropTypes.bool,
  size: PropTypes.string,
  buttonName: PropTypes.string.isRequired,
};

export default CustomForm;
