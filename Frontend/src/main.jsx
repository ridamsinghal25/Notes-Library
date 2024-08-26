import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ToastConfig from "./components/ToastConfig";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;

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
