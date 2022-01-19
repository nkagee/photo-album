import { combineReducers } from "redux";
import albumList from "./albumListReducer";
import apiCallsInProgress from "./apiStatusReducer";
import albumContents from "./albumReducer";

const rootReducer = combineReducers({
  albumList,
  albumContents,
  apiCallsInProgress,
});

export default rootReducer;
