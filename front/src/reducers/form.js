import { formTypes } from "../actions/formActions.js";

const initialState = {
    formData: {
        startPlanning: {
            salary: null,
            spare: null,
        },
    },
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case formTypes.UPDATE_FORM_DATA:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    startPlanning: {
                        ...state.formData.startPlanning,
                        ...action.payload,
                    },
                },
            };

        default:
            return state;
    }
};

export default formReducer;