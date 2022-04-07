import { SAVE_TOKEN, PLAYER_DATA, SET_QUESTIONS, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  quiz: {},
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return { ...state, token: action.payload };
  case PLAYER_DATA:
    return { ...state,
      player: { ...state.player,
        gravatarEmail: action.email,
        name: action.name,
      } };
  case SET_QUESTIONS:
    return { ...state, quiz: action.payload };
  case SET_SCORE:
    return {
      ...state,
      player: { ...state.player,
        score: action.points,
      } };
  default:
    return state;
  }
}

export default playerReducer;
