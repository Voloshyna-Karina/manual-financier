import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../actions/formActions.js";

const TextFieldUpdate = ({ id, type, label, onChange, value, variant, error, disabled, idValue }) => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(event);
        }
    };

    useEffect(() => {
        if (inputValue !== "") {
            dispatch(updateFormData({ [idValue]: inputValue }));
        }
    }, [dispatch, inputValue, idValue]);

    return (
        <TextField
            id={id}
            label={label}
            type={type}
            value={inputValue}
            variant={variant}
            size="small"
            onChange={handleChange}
            error={error}
            disabled={disabled}
        />
    );
};

export default TextFieldUpdate;