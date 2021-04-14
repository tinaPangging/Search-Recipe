const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        data: action.data,
        pageNumber: action.pageNumber,
        cuisine: action.cuisine,
        selectedIndex: action.selectedIndex,
        enter: action.enter,
        inputValue: action.inputValue
      };
    case "ENTER":
      return {
        ...state,
        enter: action.enter,
        
      };
    case "FILTER_CUISINE":
      return {
        ...state,
        cuisine: action.cuisine,
        selectedIndex: action.selectedIndex
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
