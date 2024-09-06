
import { loginInterface } from "./interfaces"
import { AxiosResponse } from "axios";
import { BASE_URL } from "./getData";
import axios from "axios";
const authenticator = async (credentials: loginInterface) => {
    
    const returnObject: AxiosResponse = await axios.get(`${BASE_URL}/users?email=${credentials.email}`);
        console.log('user got from APi',returnObject)
        if (returnObject.data.length)
        {
            if (returnObject.data[0].password == credentials.password)
            {
                sessionStorage.setItem("userEmail",returnObject.data[0]);
                return true;
            }
            
        }
        else {
            return false;
        }
}
export default authenticator