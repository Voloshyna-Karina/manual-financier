import {actionsTypes} from "../actions/index.js";

const initialState = {
    loading: false,
    currencies: [],
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.FETCH_CURRENCIES_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionsTypes.FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                loading: false,
                currencies: action.payload,
                error: null,
            };
        case actionsTypes.FETCH_CURRENCIES_FAILURE:
            return {
                ...state,
                loading: false,
                currencies: [],
                error: action.payload,
            };

        default:
            return state;
    }
}