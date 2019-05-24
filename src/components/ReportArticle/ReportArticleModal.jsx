import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal, Form, Popup, Message } from 'semantic-ui-react';
import { reportAnArticleAction } from '../../actions/reportArticleActions';
import { SHOW_MODAL } from '../../actions/types';
import store from '../../store';
import isEmpty from "../../utils/is_empty";

export class ReportArticleModal extends Component {
  constructor() {
    super();
    this.state = {
      type_of_report: '',
      report: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange=(e, { value }) => this.setState({ type_of_report: value });

  reportArticle = (event) => {
    event.preventDefault();
    const { articleReporter, slug } = this.props;

    articleReporter({ slug, report: this.state });
    store.dispatch({ type: SHOW_MODAL, payload: { modalShow: false } });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reports){
      this.setState({
        type_of_report: '',
        report: ''
      })
    }
  }

  render() {
    const countryOptions = _.map(['spam', 'harassment', 'rules violation', 'plagiarism'], country => ({
      key: country,
      text: country,
      value: country,
    }));
    const {type_of_report, report} = this.state
    const {loading, reports, errorMessage} = this.props;

    console.log(this.props)
    
    return (
      <Modal 
      as='h1'
      trigger={
        <Popup
              trigger={<Button circular size='large' icon="fas fa-ellipsis-h" />}
              content='Report this article'
              on={['click']}
              hideOnScroll
              position='bottom center'
        /> 
      }
      basic
      closeIcon>
        <Header
          as='h1' 
          icon='shield alternate' 
          content='REPORT ARTICLE' />
        <Modal.Content>
        {!isEmpty(reports.report) 
          ? <Message success header='Reporting Completed' content="Your report has successfully been recieved. Kindly close the form." /> 
          : ''
        }
        
          <Form loading={loading}>
            <Form.Select 
              label="Type of report" 
              placeholder='Type_of_report' 
              options={countryOptions}
              name='type_of_report' 
              value={type_of_report} 
              onChange={this.handleSelectChange}
              error={!isEmpty(errorMessage ? errorMessage.type_of_report : '')}
              />
            <Form.TextArea
              label='Report' 
              placeholder='Tell us more about it...'
              name='report' 
              value={report} 
              onChange={this.handleChange}
              error={!isEmpty(errorMessage ? errorMessage.report : '')}
              />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            type="submit"
            onClick={this.reportArticle}
          >
            <Icon name='checkmark' /> 
            Report
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}


ReportArticleModal.defaultProps = {
  slug: '',
  loading: false,
  reports: {},
  errorMessage: {},
};

ReportArticleModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  slug: PropTypes.string,
  articleReporter: PropTypes.func.isRequired,
};

export const mapStateToProps = ({reports}) => ({
  loading: reports.loading,
  reports: reports.report,
  errorMessage: reports.errorMessage.errors,
});

export const mapDispatchToProps = dispatch => ({
  articleReporter: (slug, reportData) => {
    dispatch(reportAnArticleAction(slug, reportData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportArticleModal);
// export default ReportArticleModal;
