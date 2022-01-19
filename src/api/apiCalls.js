import { handleError, handleResponse } from "./apiUtils";

export function getAlbums() {
  return fetch("https://jsonplaceholder.typicode.com/albums")
    .then(handleResponse)
    .catch(handleError);
}

export function getAlbumById(albumId) {
  return fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getAlbumContents(albumId) {
  return fetch(`https://jsonplaceholder.typicode.com/album/${albumId}/photos`)
    .then(handleResponse)
    .catch(handleError);
}
