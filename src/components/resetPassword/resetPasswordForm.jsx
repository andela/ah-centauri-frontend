import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';

const ResetPasswordForm = ({ ...props }) => {
const {
    errorMessage,
    successMessage,
    formState,
    handleSubmit,
    inputFields,
} = props;

return (
<Form
className={formState} 
onSubmit={handleSubmit}
style={{
    marginTop: '10%',
    marginBottom: '10%',
    maxWidth: '450px',
    marginLeft: 'auto',
    marginRight: 'auto'
}}>
    {inputFields.map((input, index) => (
        <Form.Input
          {...input}
          key={index}
        />
    ))}
    <Message success header='success!' content={successMessage.message} />
    <Message error header='error!' content={errorMessage} />

    <Button
    fluid
    primary
    size="large"
    type="submit"
    >
        Submit
    </Button>
</Form>
);
};

ResetPasswordForm.defaultProps = {
    inputFields: [],
};

ResetPasswordForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    inputFields: PropTypes.array.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.object,
    formState: PropTypes.string,
};

export default ResetPasswordForm;