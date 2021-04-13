const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                data: action.data
            };
        case 'UPDATE_POST':
            return {
                ...state,
                pageNumber : action.pageNumber
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.data
            };
        default:
            return state;
    }
};

export default Reducer;