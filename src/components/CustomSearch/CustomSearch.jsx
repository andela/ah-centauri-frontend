import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import CustomForm from '../CustomForm/CustomForm';

class CustomSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);
  };

  render() {
    const { search } = this.state;

    return (
      <section className="introduce">
        <Container>
          <CustomForm
            className="filter-form clearfix wow  animated"
            id="search-panel"
            size="large"
            handleSubmit={this.handleSubmit}
            buttonName="register"
            inputFields={[
              {
                fluid: true,
                name: 'search',
                id: 'search',
                placeholder: 'search',
                type: 'text',
                value: search,
                onChange: this.handleInputChange,
              }]}
          />
        </Container>
      </section>
    );
  }
}

export default CustomSearch;
