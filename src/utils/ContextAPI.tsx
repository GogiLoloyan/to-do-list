import { createContext, useContext } from "react";

export const MyGlobalContext = createContext({});

export const useGlobalContext = () => useContext(MyGlobalContext);
