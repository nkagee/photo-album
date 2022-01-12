import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function albumListReducer(
  state = initialState.albumList,
  action
) {
  switch (action.type) {
    case types.LOAD_SINGLE_ALBUM_SUCCESS:
      return [...state, { ...action.album }];

    case types.LOAD_ALBUM_LIST_SUCCESS:
      return [...state, ...action.albums.slice(0, 12)];
    default:
      return state;
  }
}
