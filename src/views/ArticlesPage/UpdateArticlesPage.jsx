import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import {
  Message,
} from 'semantic-ui-react';
import Footer from '../../components/layout/Footer';
import HeaderLayout from '../../components/layout/HeaderLayout';
import {
  updateArticles,
  getSingleArticles,
} from '../../actions/articlesActions';
import isEmpty from '../../utils/is_empty';
import requireAuth from '../../HOC/requireAuth';
import axios from 'axios';

export class UpdateArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: EditorState.createEmpty(),
      errorMessage: {},
      title: '',
      description: '',
      tags: '',
      loading: false,
    };
  }

  static uploadImageCallBack(file) {
    try {
      const url = 'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/dv85uhrw5/image/upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'cczvn3h1');
      return axios.post(url, formData);
    }
    catch (err) {
      return err;
    }
  }


  componentDidMount() {
    const { slug } = this.props.match.params;

    this.props.getSingleArticles(slug, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    try {
      const articles = [];
      articles.push(nextProps.article);
      const article = articles[0];
      const articleBody = article.body;
      const contentBlock = htmlToDraft(articleBody);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const body = EditorState.createWithContent(contentState);

      this.setState({
        title: article.title,
        description: article.description,
        body,
        tags: article.tags.join(),
        errorMessage: nextProps.errorMessage,
      });
    } catch (e) {
    }
  }


  onEditorStateChange = (body) => {
    this.setState({
      body,
    });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      body,
      title,
      tags,
      description,
    } = this.state;
    const { slug } = this.props.match.params;

    const noSpaceString = tags.replace(/\s/g, '');
    let tagsArray = [];
    if (!isEmpty(noSpaceString)) {
      tagsArray = noSpaceString.split(',');
    }

    this.props.updateArticles({
      slug,
      title,
      body: draftToHtml(convertToRaw(body.getCurrentContent())),
      description,
      tags: tagsArray,
    }, this.props.history);
  };

  render() {
    const {
      body, title, tags, errorMessage, description,
    } = this.state;

    const errorList = [];
    if (errorMessage.errors) {
      Object.keys(errorMessage.errors)
        .forEach((key, index) => errorList.push(`${key} => ${errorMessage.errors[key][0]}`));
    }


    return (
      <section id="create-article">
        <HeaderLayout />
        <div className="row home">
          <div className="column">
            <div className="articles">
              <h3 className="article-title text-uppercase text-center fadeInUp">
                Update Blog
                <br />
                 Post
              </h3>
              <p
                className="text-center wow fadeInUp"
                data-wow-delay="0.3s"
                style={{ visibility: 'visible', animationDelay: '0.3s' }}
              >
                Once done, Click on save to publish the new article.
              </p>
              <form className="article-form bounceInUp" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="style-input"
                  placeholder="Title"
                  name="title"
                  value={title}
                  required
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  className="style-input"
                  placeholder="Short Story Description ..."
                  name="description"
                  value={description}
                  required
                  onChange={this.handleInputChange}
                />
                <div className="editor-bg">
                  <Editor
                    editorState={body}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange}
                    hashtag={{
                      separator: ' ',
                      trigger: '#',
                    }}
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image', 'remove', 'colorPicker', 'history'],
                      inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                      },
                      fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                      },
                      image: {
                        uploadCallback: UpdateArticlesPage.uploadImageCallBack,
                        className: 'detail-image',
                        alignmentEnabled: false,
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                        alt: {
                          present: true,
                          mandatory: true,
                        },
                        defaultSize: {
                          height: '100%',
                          width: '95%',
                        },
                      },
                    }}
                  />
                </div>

                <div className="ui left icon right labeled input" style={{ width: '100%' }}>
                  <input
                    type="text"
                    required=""
                    placeholder="music, Dance, Art, "
                    name="tags"
                    value={tags}
                    onChange={this.handleInputChange}
                  />
                  <i
                    aria-hidden="true"
                    className="tags icon"
                  />
                  <div className="ui tag label label">Add Tag</div>
                </div>
                {errorMessage.errors
                  ? (
                    <Message
                      error
                      header="There were some errors in your submission"
                      list={errorList}
                      style={{ width: '100%' }}
                    />
                  ) : ''}

                <button type="submit" className="style-btn">Publish</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

UpdateArticlesPage.defautProps = {
  loading: false,
  errorMessage: {},
  article: {},
};

UpdateArticlesPage.propTypes = {
  article: PropTypes.object,
  errorMessage: PropTypes.object,
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
  updateArticles: PropTypes.func.isRequired,
  getSingleArticles: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ auth, articles }) => ({
  errorMessage: articles.errorMessage,
  loading: articles.loading,
  article: articles.article,
  authenticated: auth.authenticated,
});

export default requireAuth(connect(mapStateToProps, { updateArticles, getSingleArticles })(UpdateArticlesPage));
