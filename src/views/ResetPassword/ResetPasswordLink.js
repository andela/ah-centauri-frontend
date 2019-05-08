import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetPasswordLinkService } from '../../actions/resetActions'
import ResetPasswordForm from '../../components/resetPassword/resetPasswordForm'

class ResetPasswordLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            errorMessage: '',
            successMessage: {},
            formState: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.errorMessage !== nextProps.errorMessage
            || prevState.successMessage !== nextProps.successMessage
            || prevState.formState !== nextProps.formState){
                return {
                    errorMessage: nextProps.errorMessage,
                    successMessage: nextProps.successMessage,
                    formState: nextProps.formState
                }
        }
        return null
    }

    handleChange = (e) => {
        this.setState({email: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const email = {
            user : {
                email: this.state.email,
            }
        };
        this.props.resetPasswordLinkService({email});
    }

    render(){
        const {
            email, errorMessage, successMessage, formState
          } = this.state;
        return(
            <ResetPasswordForm
                errorMessage={errorMessage}
                successMessage={successMessage}
                formState={formState}
                handleSubmit={this.handleSubmit}
                inputFields={[
                    {
                        label:'Email',
                        placeholder:'user@gmail.com',
                        value:email,
                        onChange:this.handleChange
                    }
                ]}
            />
        );
    }
    
}


ResetPasswordLink.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    errorMessage: PropTypes.string,
    successMessage: PropTypes.object,
    formState: PropTypes.string,
    resetPasswordLinkService: PropTypes.func.isRequired,
  };
  
export const mapStateToProps = (state) => ({
    errorMessage: state.resetReducer.errorMessage,
    successMessage: state.resetReducer.successMessage,
    formState: state.resetReducer.formState
});

export default connect(
    mapStateToProps,
    { resetPasswordLinkService },
)(ResetPasswordLink);

export const _ResetPasswordLink = ResetPasswordLink
  