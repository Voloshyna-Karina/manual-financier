import { formTypes } from "../actions/formActions.js";

const initialState = {
    formData: {
        planning: {
            salary: null,
            convertedSalary: null,
            monthlySavings: null,
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
                    [action.payload.key]: {
                        ...state.formData[action.payload.key],
                        ...action.payload.data,
                    },
                },
            };

        default:
            return state;
    }
};

export default formReducer;