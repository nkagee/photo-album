import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function albumReducer(
  state = initialState.albumContents,
  action
) {
  switch (action.type) {
    case types.LOAD_ALBUM_CONTENTS_SUCCESS:
      return {
        ...state,
        [action.payload.albumId]: [...action.payload.contents],
      };

    default:
      return state;
  }
}
