import { BASE_URL } from "./getData";
import { AxiosResponse } from "axios";
import axios from "axios";
const loginThroughCode = async (email: string) => {
  const returnObject: AxiosResponse = await axios.get(
    `${BASE_URL}/users?email=${email}`
  );
  console.log("user got from APi", returnObject);
  if (returnObject.data.length) {
    sessionStorage.setItem("userEmail", JSON.stringify(returnObject.data[0]));
    return returnObject.data[0];
  }
};
export default loginThroughCode;
