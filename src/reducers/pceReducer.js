const initialState = {
    loading: false,
    error: null,
    data: [],
};

export const getCltReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLT_REQUEST':
            return { ...state, loading: true };
        case 'GET_CLT_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'GET_CLT_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getPieceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PCE_REQUEST':
            return { ...state, loading: true };
        case 'GET_PCE_SUCCESS':
            return { ...state, loading: false, pieces: action.payload };
        case 'GET_PCE_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};