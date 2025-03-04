import {actionsTypes} from "../actions/index.js";

const initialState = {
    currencies: null,
    pendingCurrencies: false,
    currenciesError: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.FETCH_CURRENCIES_PENDING:
            return {
                ...state,
                pendingCurrencies: true,
                currenciesError: null,
            };

        case actionsTypes.FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                currencies: action.payload,
                pendingCurrencies: false,
            };

        case actionsTypes.FETCH_CURRENCIES_FAILURE:
            return {
                ...state,
                pendingCurrencies: false,
                currenciesError: action.payload,
            };

        default:
            return state;
    }
}