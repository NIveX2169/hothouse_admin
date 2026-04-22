import axios from "axios";


// This code is used to access redux store in this file.
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Creating new axios instance
export const instance = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_REACT_APP_WORKING_ENVIRONMENT === "development"
      ? import.meta.env.VITE_REACT_APP_API_BASE_URL_DEVELOPMENT
      : import.meta.env.VITE_REACT_APP_API_BASE_URL_PRODUCTION
    }`,
});



// Creating new axios instance V2
export const instanceV2 = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_REACT_APP_WORKING_ENVIRONMENT === "development"
      ? import.meta.env.VITE_REACT_APP_API_BASE_URL_DEVELOPMENT_V2
      : import.meta.env.VITE_REACT_APP_API_BASE_URL_PRODUCTION_V2
    }`,
});

