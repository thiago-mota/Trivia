export const SAVE_TOKEN = 'SAVE_TOKEN';
export const PLAYER_DATA = 'PLAYER_DATA';

export const saveToken = (payload) => ({ type: SAVE_TOKEN, payload });
export const savePlayer = (email, name) => ({ type: PLAYER_DATA, email, name });
