import { Store } from "redux";
import store from "src/store/store";
import sagaStore from "src/sagaStore/sagaStore";
import middleware from "./settings";

const configureStore = (): Store => {
  return middleware === "thunk" ? store : sagaStore;
};

export default configureStore;
