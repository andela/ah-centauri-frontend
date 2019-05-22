import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchModal from './SearchModal';
import { searchArticles } from '../../actions/searchActions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      option: '',
      articleSearchResults: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { searchArticles } = this.props;
    event.preventDefault();
    const searchValue = event.target.searchInput.value;
    const optionValue = event.target.options.value;
    this.setState(
      prevState => ({
        ...prevState,
        search: searchValue,
        option: optionValue,
      }),
    );
    const data = {
      key: optionValue,
      value: searchValue.toLowerCase(),
    };
   
    searchArticles(data);
  };

  render() {
    const { articleSearchResults, count } = this.props;
    return (
      <div>
        <SearchModal handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} articles={articleSearchResults} results={count}/>
      </div>
    );
  }
}

const mapStateToProps = ({ articles }) => ({
  articleSearchResults: articles.articleSearchResults,
  count: articles.searchCount,
});

export default connect(mapStateToProps, {
  searchArticles,
})(Search);
