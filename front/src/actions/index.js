import {userTypes} from "./userActions.js";
import {formTypes} from "./formActions.js";

export const actionsTypes = {
    ...userTypes, ...formTypes,
}