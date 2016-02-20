import { createStore, combineReducers } from 'redux';
import { Component } from './../../libs/';
import _template from './index.html';

const AppStore = (state = 'SHOW_ALL', action ) => {
  switch (action.type) {
    case 'ACTION':
        return action.value;
    default:
        return state;
  }
}

export default class App extends Component {
  constructor(data, el){
    super(data, createStore(AppStore), el||document.body);
  }
};
