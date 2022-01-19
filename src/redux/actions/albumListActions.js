import * as types from "./actionTypes";
import * as api from "../../api/apiCalls";

import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSingleAlbum(albumId) {
  return function (dispatch) {
    dispatch(beginApiCall());

    return api
      .getAlbumById(albumId)
      .then((album) => {
        dispatch(loadSingleAlbumSuccess(album));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadSingleAlbumSuccess(album) {
  return { type: types.LOAD_SINGLE_ALBUM_SUCCESS, album };
}

export function loadAlbumList() {
  return function (dispatch) {
    dispatch(beginApiCall());

    return api
      .getAlbums()
      .then((albums) => {
        dispatch(loadAlbumListSuccess(albums));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadAlbumListSuccess(albums) {
  return { type: types.LOAD_ALBUM_LIST_SUCCESS, albums };
}
