import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import htmlToDraft from 'html-to-draftjs';
import {
  ContentState,
  EditorState,
} from 'draft-js';
import { CreateArticlesPage, mapStateToProps } from '../CreateArticlesPage';


const setUp = () => {
  const props = {
    errorMessage: {},
    authenticated: false,
    loading: false,
    createArticles: jest.fn(),
  };
  const wrapper = shallow(<CreateArticlesPage {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('CreateArticlesPage page test', () => {
  const { wrapper, props } = setUp();

  const errorMessage = { errors: { title: ['required'] } };

  const html = '<p>Hey this <strong>test</strong> content 😀</p>';
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it(' render create article section exists', () => {
    const createArticleSection = wrapper.find('#create-article');

    expect(createArticleSection.exists())
      .toBe(true);
  });

  it('render componentWillReceiveProps with change', () => {
    wrapper.setProps({ errorMessage });
    expect(wrapper.state().errorMessage).toEqual(errorMessage);
  });

  it('render componentWillReceiveProps with no change', () => {
    wrapper.setProps();
    expect(wrapper.state().errorMessage).toEqual(errorMessage);
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
      .onEditorStateChange(editorState);

    expect(wrapper.state('editorState'))
      .toEqual(editorState);
  });

  it(' test handleSubmit event', () => {
    wrapper.instance()
      .handleSubmit({
        preventDefault() {
        },
      });
    const expectedState = {
      editorState,
      errorMessage,
      tags: 'test,test1',
      loading: false,
      title: 'test',
      description: '',
    };
    expect(wrapper.state())
      .toEqual(expectedState);
  });
});
