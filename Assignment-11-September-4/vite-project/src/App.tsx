import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import ForgetPassword from "./pages/ForgetPassword";


function App() {
  return (
    <>
      
      <Provider store={store}>
     
        <ForgetPassword />
        </Provider>
    </>
  );
}

export default App;
