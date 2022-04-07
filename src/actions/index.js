export const SAVE_TOKEN = 'SAVE_TOKEN';
export const PLAYER_DATA = 'PLAYER_DATA';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_SCORE = 'SET_SCORE';

export const saveToken = (payload) => ({ type: SAVE_TOKEN, payload });
export const savePlayer = (email, name) => ({ type: PLAYER_DATA, email, name });
export const setQuestions = (payload) => ({ type: SET_QUESTIONS, payload });
export const saveScore = ({ points }) => ({ type: SET_SCORE, points });
