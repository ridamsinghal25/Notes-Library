import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ToastConfig from "./components/basic/ToastConfig.jsx";
import AuthService from "./services/AuthService.js";
import ApiError from "./services/ApiError.js";
import { ThemeProvider } from "@/components/theme/theme-provider.jsx";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 120000;

let refreshingTokenInProgress = false;

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
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
        <ThemeProvider defaultTheme="dark" storageKey="notes-library-theme">
          <App />
        </ThemeProvider>
        <ToastConfig />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
