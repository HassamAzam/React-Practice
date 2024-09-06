import { BASE_URL } from "./getData";
import { signupInterface } from "./interfaces";
import checkifExists from "./checkIfExists";
import axios from "axios";
const signUpUtility = async (user: signupInterface) => {
  const ifExist = await checkifExists(user.email);
  if (!ifExist) {
    await axios.post(`${BASE_URL}/users`, user);
    return true;
  } else {
    return false;
  }
};

export default signUpUtility;
