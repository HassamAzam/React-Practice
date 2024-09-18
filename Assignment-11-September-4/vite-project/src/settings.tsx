import axios from 'axios';

export const isMiddleware =
  import.meta.env.VITE_MIDDLEWARE === 'thunk' ? true : false;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const serviceID = import.meta.env.VITE_SERVICE_ID;
export const emailToken = import.meta.env.VITE_EMAIL_TOKEN;
export const templateID = import.meta.env.VITE_TEMPLATE_ID;

axios.defaults.baseURL = BASE_URL;
