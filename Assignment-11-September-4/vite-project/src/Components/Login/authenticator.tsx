import { loginInterface } from "../../Utilities/interfaces";
import { AxiosResponse } from "axios";
import { BASE_URL } from "../../Utilities/baseURL";
import axios from "axios";
const authenticator = async (credentials: loginInterface) => {
  try {
    const returnObject: AxiosResponse = await axios.get(
      `${BASE_URL}/users?email=${credentials.email}`
    );
    if (returnObject.data.length) {
      if (returnObject.data[0].password == credentials.password) {
        sessionStorage.setItem(
          "userEmail",
          JSON.stringify(returnObject.data[0])
        );
        return returnObject.data[0];
      }
    }
  } catch (e) {
    return false;
  }
};
export default authenticator;
