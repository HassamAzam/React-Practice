import { BASE_URL } from "./getData";
import { AxiosResponse } from "axios";
import axios from "axios";
const checkifExists = async (email: string) =>
{
    try {

        const returnObject: AxiosResponse = await axios.get(`${BASE_URL}/users?email=${email}`);
        console.log('user got from APi',returnObject)
        if (returnObject.data.length)
        {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
    
    

};
  export default checkifExists;
