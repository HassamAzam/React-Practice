import axios, { AxiosResponse } from 'axios';

import { SignUpInterface } from 'src/Utilities/interfaces';

export const checkIfExist = async (
  user: SignUpInterface,
): Promise<AxiosResponse | null> => {
  try {
    return await axios.get(`?email=${user.email}`);
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return null;
  }
};

export const signUp = async (
  user: SignUpInterface,
): Promise<AxiosResponse | null> => {
  try {
    return await axios.post(`/users`, user);
  } catch (error) {
    console.error('Error signing up user:', error);
    return null;
  }
};
