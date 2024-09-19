import { Store } from "redux";
import store from "src/store/store";
import sagaStore from "src/sagaStore/sagaStore";
import { isMiddleware } from "./settings";

const configureStore = (): Store => {
  return isMiddleware ? store : sagaStore;
};

export default configureStore;
