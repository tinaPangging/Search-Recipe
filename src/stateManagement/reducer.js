/***
 * creating a reducer function which works with useREducer.
 * The Reducer function takes state and an action so that the global state of the application can be accesible and manageable
 * */ 

const Reducer = (state, action) => {
    
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        data: action.data,
        pageNumber: action.pageNumber,
        cuisine: action.cuisine,
        selectedIndex: action.selectedIndex,
        enter: action.enter,
        inputValue: action.inputValue
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.data
      };
    default:
      return state;
  }
};

export default Reducer;
