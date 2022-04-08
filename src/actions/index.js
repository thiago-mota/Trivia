export const SAVE_TOKEN = 'SAVE_TOKEN';
export const PLAYER_DATA = 'PLAYER_DATA';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_SCORE = 'SET_SCORE';
export const DEFAULT_STATE = 'DEFAULT_STATE';

export const saveToken = (payload) => ({ type: SAVE_TOKEN, payload });
export const savePlayer = (email, name) => ({ type: PLAYER_DATA, email, name });
export const setQuestions = (payload) => ({ type: SET_QUESTIONS, payload });
export const defaultState = () => ({ type: DEFAULT_STATE });
export const saveScore = ({ points, assertions }) => (
  { type: SET_SCORE, points, assertions });
