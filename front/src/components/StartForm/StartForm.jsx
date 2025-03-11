import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import './StartForm.css';
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../actions/formActions.js";
import PropTypes from "prop-types";
import TextFieldUpdate from "../TextFieldUpdate/TextFieldUpdate.jsx";

const currency = [
    {
        "r030": 985,
        "txt": "Злотий",
        "sale": 10.45,
        "buy": 10.40,
        "cc": "PLN"
    },
    {
        "r030": 980,
        "txt": "Гривня",
        "sale": 1,
        "buy": 1,
        "cc": "UAH"
    },
    {
        "r030": 203,
        "txt": "Чеська крона",
        "sale": 1.75,
        "buy": 1.72,
        "cc": "CZK"
    },
    {
        "r030": 840,
        "txt": "Долар США",
        "sale": 41.60,
        "buy": 41.50,
        "cc": "USD"
    },
    {
        "r030": 978,
        "txt": "Євро",
        "sale": 45.50,
        "buy": 45.40,
        "cc": "EUR"
    }
];

const StartForm = ({ handleComplete }) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state?.form?.formData?.planning);

    const [expectedSalary, setExpectedSalary] = useState(formData?.salary || '');
    const [mainCurrency, setMainCurrency] = useState('');
    const [convertedSalary, setConvertedSalary] = useState(formData?.convertedSalary || '');
    const [monthlySavings , setMonthlySavings] = useState(formData?.monthlySavings || '');

    const [alertError, setAlertError] = useState(false);
    const [textAlertError, setTextAlertError] = useState('');
    const [errorsText, setErrorsText] = useState(false);
    const [showConvertedSalaryTextField, setConvertedSalaryTextField] = useState(false);

    useEffect(() => {
        if (mainCurrency !== 980) {
            setConvertedSalaryTextField(true);
        } else {
            setConvertedSalaryTextField(false);
        }
    }, [mainCurrency]);

    const handleInputChangeMain = (e) => setExpectedSalary(e.target.value);
    const handleChangeMainCurrency = (e) => setMainCurrency(e.target.value);
    const handleChangeMonthlySavings = (e) => setMonthlySavings(e.target.value);

    const calculateAmountInUAH = () => {
        // if (expectedSalary !== null && mainCurrency !== '') {
        //     const targetCurrency = currency.find((item) => item.r030 === mainCurrency);
        //     if (!targetCurrency) {
        //         setAlertError(true);
        //         setTextAlertError('Курс валюти не знайдено.');
        //         return;
        //     }
        //
        //     const saleRate = targetCurrency.sale;
        //
        //     let amountInUAH;
        //     if (mainCurrency === 980) {
        //         amountInUAH = expectedSalary;
        //     } else {
        //         amountInUAH = expectedSalary * saleRate;
        //     }
        //
        //     // dispatch(updateFormData({
        //     //     salary: amountInUAH
        //     // }));
        //     setConvertibleAmount(amountInUAH);
        //     // setConvertibleAmount(parseFloat(amountInUAH.toFixed(2)));
        // }
    };

    useEffect(() => {
        calculateAmountInUAH();
    }, [expectedSalary, mainCurrency]);

    // useEffect(() => {
    //     if (mainCurrency === 980) {
    //         // Если выбрана UAH, передаём expectedSalary
    //         dispatch(updateFormData({
    //             salary: convertedSalary,
    //             spare: monthlySavings
    //         }));
    //     } else {
    //         // Если выбрана другая валюта, передаём convertedSalary
    //         dispatch(updateFormData({
    //             salary: expectedSalary,
    //             spare: monthlySavings
    //         }));
    //     }
    // }, [monthlySavings, dispatch, mainCurrency, convertedSalary, expectedSalary]);

    const handleConvert = () => {
        if (!expectedSalary || !mainCurrency) {
            setErrorsText(true);
            return;
        }

        setErrorsText(false);
        setAlertError(false);
        handleComplete();
    };

    return (
        <div className={'start-form'}>
            <div className={"main-form"}>
                <div className={"main-form-text-field"}>
                    <TextFieldUpdate
                        id="outlined-basic"
                        label="Початкова сума"
                        type="number"
                        value={expectedSalary}
                        idValue="salary"
                        variant="outlined"
                        onChange={handleInputChangeMain}
                        error={errorsText && !expectedSalary}
                    />
                </div>
                <div className={"main-form-text-field"}>
                    <FormControl sx={{ minWidth: 110 }} size="small">
                        <InputLabel id="demo-select-small-label">Валюта</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={mainCurrency}
                            label="Валюта"
                            onChange={handleChangeMainCurrency}
                            error={errorsText && !mainCurrency}
                        >
                            {currency.map((item) => (
                                <MenuItem key={item.r030} value={item.r030}>
                                    {item.cc}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {showConvertedSalaryTextField && (
                    <div className={"main-form-text-field"}>
                        <TextFieldUpdate
                            id="outlined-basic"
                            label="Сума в UAH"
                            type="number"
                            value={convertedSalary}
                            idValue="convertedSalary"
                            variant="outlined"
                            disabled
                            error={errorsText && !convertedSalary}
                        />
                    </div>
                )}
            </div>
            <div className={"main-form"}>
                <div className={"main-form-text-field"}>
                    <TextFieldUpdate
                        id="outlined-basic"
                        label="Заощадження"
                        type="number"
                        value={monthlySavings}
                        idValue="monthlySavings"
                        onChange={handleChangeMonthlySavings}
                        variant="outlined"
                        error={errorsText && !monthlySavings}
                    />
                </div>
                <div className={"main-form-text-field"}>
                    <Button
                        variant="contained"
                        onClick={handleConvert}
                    >
                        Продовжити
                    </Button>
                </div>
            </div>

            {alertError && (
                <Alert
                    severity="error"
                    onClose={() => setAlertError(false)}
                    className={"alert"}
                >
                    {textAlertError}
                </Alert>
            )}
        </div>
    );
};

export default StartForm;