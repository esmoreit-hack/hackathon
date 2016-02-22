import { createStore, combineReducers } from 'redux';
import { Component } from './../../libs/';
import _template from './index.html';

const UnitModel = ( state = {pos: [0,0,0], dir: [0,0,0], type: '', user_id: 0 }, action ) => {
  switch (action.type) {
    case 'ADD_UNIT':
      return {
        id: action.id,
        title: action.title,
        completed: false
      };
      break;
    case 'SELECT_UNIT':
      if (state.id != action.id) return state;
      return {
        ...state,
        completed: !state.completed
      };
      break;
    default:
      return state;
  }
};

const Cube = (state = [], action ) => {
  switch (action.type) {
    case 'RESET':
      return [];
    case 'ADD_UNIT':
      if(state.length > 27) return state;
      return [
        ...state,
        UnitModel(undefined, action)
      ];
    case 'SELECT_UNIT':
      return state.map(t => TodoModel(t, action));
    default:
      return state;
  }
};

const User = (state = {name: '', instance_id: '', id: 0, status: 'afk' }, action ) => {
  switch (action.type) {
    case 'SET_USER_STATUS':
        return {
          ...state,
          status: action.status === 'queue' ? 'queue' : 'afk'
        };
    case 'SET_NAME':
        return {
          ...state,
          name: action.name
        };
    case 'INSTANCE_ID':
        return {
          ...state,
          name: action.name
        };
    default:
        return state;
  }
}

const Game = combineReducers({
    cube: Cube,
    user: User
});

class App extends Component {
  constructor(data, el){
    super(_template, createStore(Game), el||document.body);
    this.store.dispatch({map: '', type: 'ADD_MAP'});
    var snd = new Audio("ambient-wave.wav"); // buffers automatically when created
    snd.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    snd.play();
  }
};

export {
  App
};
