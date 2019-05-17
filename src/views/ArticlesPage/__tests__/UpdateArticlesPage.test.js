import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import htmlToDraft from 'html-to-draftjs';
import {
  ContentState,
  EditorState,
} from 'draft-js';
import { UpdateArticlesPage } from '../UpdateArticlesPage';


const setUp = () => {
  const props = {
    match: { params: { slug: 'test' } },
    article: {},
    errorMessage: {},
    authenticated: false,
    loading: false,
    updateArticles: jest.fn(),
    getSingleArticles: jest.fn(),
  };
  const wrapper = shallow(<UpdateArticlesPage {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('UpdateArticlesPage page test', () => {
  const { wrapper, props } = setUp();

  const body = '<p>Hey this <strong>test</strong> content 😀</p>';

  const contentBlock = htmlToDraft(body);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorNewState = EditorState.createWithContent(contentState);

  const article = {
    title: '',
    body,
    description: '',
    tags: 'test,test',
    errorMessage: { errors: { title: ['Required'] } },
  };

  it(' render create article section exists', () => {
    const createArticleSection = wrapper.find('#create-article');

    expect(createArticleSection.exists())
      .toBe(true);
  });

  it(' to call ComponentDidMount', () => {
    expect(props.getSingleArticles).toBeCalledTimes(1);
  });

  it('render componentWillReceiveProps with change', () => {
    wrapper.setProps({ article });
    expect(wrapper.state().title).toEqual(article.title);
  });

  it('render componentWillReceiveProps with no change', () => {
    wrapper.setProps();
    expect(wrapper.state().title).toEqual(article.title);
  });

  it(' should handleInputChange function', () => {
    wrapper
      .instance()
      .handleInputChange({
        target: {
          name: 'title',
          value: 'test',
        },
      });
    wrapper
      .instance()
      .handleInputChange({
        target: {
          name: 'tags',
          value: 'test,test1',
        },
      });
    expect(wrapper.state('tags'))
      .toEqual('test,test1');
  });

  it(' should onEditorStateChange function', () => {
    wrapper
      .instance()
      .onEditorStateChange(editorNewState);

    expect(wrapper.state('body'))
      .toEqual(editorNewState);
  });

  it(' test handleSubmit event', () => {
    wrapper.setState({ errorMessage: article.errorMessage });
    wrapper.instance()
      .handleSubmit({
        preventDefault() {
        },
      });
    const expectedState = {
      body: editorNewState,
    };
    expect(wrapper.state().body)
      .toEqual(expectedState.body);
  });
});
