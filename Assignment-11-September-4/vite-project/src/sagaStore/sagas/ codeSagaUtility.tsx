import emailjs from "@emailjs/browser";
import axios, { AxiosResponse, AxiosPromise } from "axios";

import { serviceID, templateID, emailToken } from "src/settings";
import { SignUpInterface } from "src/Utilities/interfaces";

export const checkUserExists = async (email: string): Promise<AxiosPromise> => {
  try {
    const response: AxiosResponse = await axios.get(`users?email=${email}`);
    return response.data[0] || null;
  } catch (error) {
    throw new Error("Failed to check user existence");
  }
};

const sendEmail = async (
  email: string,
  user: SignUpInterface
): Promise<void> => {
  const emailParams = {
    to_name: email,
    from_name: "SurveyCopsTeam",
    message: `Your user details: ${JSON.stringify(user)}`,
  };

  try {
    await emailjs.send(serviceID, templateID, emailParams, emailToken);
  } catch (error) {
    console.error(error);
  }
};
