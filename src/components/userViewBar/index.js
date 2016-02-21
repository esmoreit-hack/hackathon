import { createStore, combineReducers } from 'redux';
import { Component, Map } from './../../libs/';
import _template from './index.html';
import map from '../../../dist/map.json';

const ScreenStoreB = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'ACTION':
      return action.value;
    default:
      return state;
  }
};

class UserViewBar extends Component {
  firstRender=true;
  constructor(data, el) {
    super(_template, createStore(ScreenStoreB), el);
    this.on('after:render', () => {
      if (this.firstRender) {
        this.firstRender = false;
        this.render();
      }
    });
  }
};

export {
  UserViewBar
};
