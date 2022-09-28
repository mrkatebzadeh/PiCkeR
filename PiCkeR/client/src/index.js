import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import AuthenticationContextProvider from "./Contexts/Authentication";

const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <AuthenticationContextProvider>
      <App />
      </AuthenticationContextProvider>
    </React.StrictMode>
  );

