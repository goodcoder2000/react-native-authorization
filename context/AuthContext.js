import { createContext, useMemo, useReducer } from "react";

export const AuthContext = createContext();

const initial = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return (state = { ...action.data });
    case "logout":
      return (state = { ...initial });
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
