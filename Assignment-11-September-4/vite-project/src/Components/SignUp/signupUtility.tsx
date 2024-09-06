import { BASE_URL } from "../../Utilities/getData";
import { signupInterface } from "../../Utilities/interfaces";
import checkifExists from "../../Utilities/checkIfExists";
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
