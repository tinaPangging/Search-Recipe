import { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  data: [],
  error: null,
  pageNumber: 0,
  cuisine: "Select cuisine",
  selectedIndex: 0,
  inputValue: "",
  enter: false
};

const Store = ({ children }) => {
  /***
   * store holds the state
   * the state is managed by the dispatch method 
   */
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
