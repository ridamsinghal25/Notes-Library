import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ToastConfig from "./components/ToastConfig";
import AuthService from "./services/AuthService.js";
import ApiError from "./services/ApiError.js";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;

let refreshingTokenInProgress = false;

const areCookiesEnabled = () => {
  document.cookie = "test_cookie=1";
  const cookiesEnabled = document.cookie.indexOf("test_cookie=") !== -1;

  document.cookie =
    "test_cookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Cleanup

  return cookiesEnabled;
};

axios.interceptors.request.use(
  (config) => {
    if (config?.url?.includes("login")) {
      if (!areCookiesEnabled()) {
        throw new Error("Cookies are not enabled");
      }
    }
    return config;
  },
  (error) => console.log(error) || Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.config?.url?.includes("refresh-token")) {
      return Promise.reject(error);
    }

    if (
      error?.response?.status === 401 &&
      !error?.config?.url?.includes("login") &&
      !refreshingTokenInProgress
    ) {
      refreshingTokenInProgress = true;

      const response = await AuthService.refreshAccessToken();

      refreshingTokenInProgress = false;

      if (!(response instanceof ApiError)) {
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastConfig />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
