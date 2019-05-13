import React from 'react';
import {mount} from 'enzyme/build';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect/build/index';
import {Router,} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import CountLabel from '../CountLabel';


const props = {
  followingCount: 1,
  followersCount: 0,
  color: 'black',
  followersLabel: 'Followers',
  followingLabel: 'Following',
  iconName: 'users',
};

let countLabel;

const hist = createBrowserHistory();
describe('Test Count Label Component', () => {
  beforeEach(() => {
    countLabel = mount(
        <Router history={hist}>
          <CountLabel
              labelCount={props.followersCount}
              color={props.color}
              labelName={props.followersLabel}
              iconName={props.iconName}
          />
        </Router>,
    );
  });

  it('test render for count label component', () => {
    expect(countLabel.find('.count-label').exists()).toBeTruthy();
  });
});
