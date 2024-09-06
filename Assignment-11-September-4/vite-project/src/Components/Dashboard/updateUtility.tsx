import axios from "axios";
import { signupInterface } from "../../Utilities/interfaces";
import { BASE_URL } from "../../Utilities/getData";

const updateUtility = async (user: signupInterface) => {

    await axios.put(`${BASE_URL}/users`, user);

  

};
export default updateUtility;