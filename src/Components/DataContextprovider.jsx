import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContextProvider";
export const DataContext = createContext();
const DataContextprovider = ({ children }) => {
  const currentUser = useContext(AuthContext);
  const INITIAL_DATA = {
    chatId: "",
    user: {},
  };

  const reducer = (data, action) => {
    switch (action.type) {
      case "USER_CHANGED":
        return {
          ...data,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "SIGN_OUT":
        return {
          user: null,
          chatId: "",
        };
      default:
        return data;
    }
  };
  const [data, dispatch] = useReducer(reducer, INITIAL_DATA);
  return (
    <>
      <DataContext.Provider value={{ data: data, dispatch }}>
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataContextprovider;
