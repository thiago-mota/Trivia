import { SAVE_TOKEN, PLAYER_DATA } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return { ...state, token: action.payload };
  case PLAYER_DATA:
    return { ...state,
      player: {
        gravatarEmail: action.email,
        name: action.name,
      } };
  default:
    return state;
  }
}

export default playerReducer;
