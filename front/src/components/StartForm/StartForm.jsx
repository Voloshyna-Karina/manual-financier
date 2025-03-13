import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import './StartForm.css';
import { useDispatch, useSelector } from "react-redux";
import TextFieldUpdate from "../TextFieldUpdate/TextFieldUpdate.jsx";
import {getCurrencies} from "../../actions/userActions.js";

const StartForm = ({ handleComplete }) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state?.form?.formData?.planning);
    const currency = useSelector(state => state?.user?.currencies || '');
    // console.log(currency)

    const [expectedSalary, setExpectedSalary] = useState(formData?.salary || '');
    const [mainCurrency, setMainCurrency] = useState('');
    const [convertedSalary, setConvertedSalary] = useState(formData?.convertedSalary || '');
    const [monthlySavings , setMonthlySavings] = useState(formData?.monthlySavings || '');

    const [alertError, setAlertError] = useState(false);
    const [textAlertError, setTextAlertError] = useState('');
    const [errorsText, setErrorsText] = useState(false);
    const [showConvertedSalaryTextField, setConvertedSalaryTextField] = useState(false);

    // useEffect(() => {
    //     dispatch(getCurrencies())
    //         .then((res) => {
    //             // console.log(res)
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             setAlertError(true);
    //             setTextAlertError('Наразі функція вибору валюти тимчасово недоступна. Ми працюємо над усуненням технічних обмежень і намагаємося зробити цю опцію доступною якомога швидше. Дякуємо за ваше розуміння та терпіння!');
    //         })
    // }, [dispatch]);

    const currencyFilter = currency.filter(item =>
        ["CAD", "CZK", "DKK", "HUF", "NOK", "SEK", "CHF", "GBP", "USD", "RON", "BGN", "EUR", "PLN", "RSD"].includes(item.cc)
    );

    // useEffect(() => {
    //     if (mainCurrency !== 980) {
    //         setConvertedSalaryTextField(true);
    //     } else {
    //         setConvertedSalaryTextField(false);
    //     }
    // }, [mainCurrency]);

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
        //     const saleRate = targetCurrency.rate;
        //
        //     let amountInUAH;
        //     if (mainCurrency === 100) {
        //         amountInUAH = expectedSalary;
        //     } else {
        //         amountInUAH = expectedSalary * saleRate;
        //     }
        //
        //     // dispatch(updateFormData({
        //     //     salary: amountInUAH
        //     // }));
        //     setConvertedSalaryTextField(amountInUAH);
        //     // setConvertibleAmount(parseFloat(amountInUAH.toFixed(2)));
        // }
    };

    useEffect(() => {
        calculateAmountInUAH();
    }, [expectedSalary, mainCurrency]);

    // useEffect(() => {
    //     if (mainCurrency === 100) {
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
        // handleComplete();
    };

    return (
        <div className={'start-container'}>
            <div className={"start-form"}>
                <div className={"start-form-text-field"}>
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
                <div className={"start-form-text-field"}>
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
                            <MenuItem key={100} value={100}>
                                {"UAH"} = {"Гривня"}
                            </MenuItem>
                            {currencyFilter.map((item) => (
                                <MenuItem key={item.r030} value={item.r030}>
                                    {item.cc} = {item.txt}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {showConvertedSalaryTextField && (
                    <div className={"start-form-text-field"}>
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
            <div className={"start-form"}>
                <div className={"start-form-text-field"}>
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
                <div className={"start-form-text-field"}>
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