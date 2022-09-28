import React, { createContext } from "react";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import process from "process";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
  const isdevelopment =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  const auth = process.env.REACT_APP_USE_AUTH0 == "1";

  console.log("Mode is: " + (isdevelopment ? "development" : "production"));
  console.log("Authentication is: " + (auth ? "enabled" : "disabled"));
  const { isAuthenticated, isLoading, loginWithRedirect } = auth
     useAuth0();

  if (auth) {
    return (
      <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        auth
      }}
    >
      <Auth0Provider
        clientId={process.env.REACT_APP_CLIENTID}
        domain={process.env.REACT_APP_DOMAIN}
        redirectUri={window.location.origin}
      >
        {props.children}
      </Auth0Provider>
    </AuthenticationContext.Provider>

    );
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        auth
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
