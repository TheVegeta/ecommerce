import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { Reducer } from "../reducer/app.reducer";

export const AppContext = createContext();
export const DispatchContext = createContext();

const initState = JSON.parse(window.localStorage.getItem("appState")) || {
  error: {
    isError: false,
    msg: "",
    ver: "",
  },
  isAdmin: false,
  isLogin: false,
  user: {
    email: "",
  },
  authModal: false,
  token: "",
  cart: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = state.token;
    window.localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AppContext.Provider>
  );
};
