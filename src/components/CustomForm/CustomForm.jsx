import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Message,
} from 'semantic-ui-react';

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
    .forEach((key, index) => errorList.push(errorMessage[key][0]));

  return (
    <Form loading={loading} size={size} className={className} onSubmit={handleSubmit}>

      <Message
        visible={!isEmpty(errorMessage)}
        error
        header="There was some errors with your submission"
        list={errorList}
      />
      {inputFields.map((input, index) => (
        <Form.Input
          {...input}
          key={index}
        />
      ))}


      <Form.Button
        fluid
        primary
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
