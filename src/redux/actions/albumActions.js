import * as types from "./actionTypes";
import * as api from "../../api/apiCalls";

import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAlbumContents(albumId) {
  return function (dispatch) {
    dispatch(beginApiCall());

    return api
      .getAlbumContents(albumId)
      .then((contents) => {
        dispatch(loadAlbumContentsSuccess(albumId, contents));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadAlbumContentsSuccess(albumId, contents) {
  return {
    type: types.LOAD_ALBUM_CONTENTS_SUCCESS,
    payload: { albumId, contents },
  };
}
