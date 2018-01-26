import { createStore } from "redux";
import { combineReducers } from "redux";

// let sample = new SampleData();

let workspaces = (state = null, action) => {
  if (action.type==="WORKSPACE_REFRESH") {
    let ds = action.payload;
    return ds;
  }
  return { entities: [], active: null };
};

let allReducers = combineReducers({
  workspaces: workspaces
});
// let store = createStore(allReducers);
// export default store;

export class StoreService {
  _store = null;
  static ins() {
    if (!StoreService._store) {
      StoreService._store = createStore(allReducers);
    }
    return StoreService._store;
  }
}
