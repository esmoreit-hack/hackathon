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
};

class App extends Component {
  constructor(data, el){
    super(_template, createStore(AppStore), el||document.body);
    this.store.dispatch({map: '', type: 'ADD_MAP'});
    var snd = new Audio("ambient-wave.wav"); // buffers automatically when created
    snd.play();
  }
};

export {
  App
};
