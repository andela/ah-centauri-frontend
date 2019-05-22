import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import SearchFeed from './SearchFeed';

export default ({ handleInputChange, handleSubmit, results, articles }) => {
  return (
    <Modal trigger={<Icon className="fas fa-search" />} closeIcon>
     <Modal.Header>
      <form onSubmit={handleSubmit} className="search_form">
        <div className="search">
          <select name="options">
            <option value="title" selected>Title</option>
            <option value="author">Author</option>
            <option value="tags">Tags</option>
          </select>
         <input type="text" name="searchInput" placeholder="search" onChange={handleInputChange} required/>
         <button type="submit" class="searchButton">
           <i className="fa fa-search" />
         </button>
        </div>
       </form>
     </Modal.Header>
    <Modal.Content image>
        <Modal.Description>
        <Header>{results} articles found</Header>
        <SearchFeed articles={articles} />
        </Modal.Description>
    </Modal.Content>
    </Modal>
  );
};
