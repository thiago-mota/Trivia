import { SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  token: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
}

export default playerReducer;
