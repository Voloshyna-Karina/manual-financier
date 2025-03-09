import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import './StartForm.css';
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../actions/formActions.js";

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
        "sale": 0.02,
        "buy": 0.03,
        "cc": "EUR"
    }
];

const StartForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData.startPlanning);

    const [initialAmount, setInitialAmount] = useState(formData?.salary || '');
    const [convertibleAmount, setConvertibleAmount] = useState(formData?.salary || '');
    const [mainCurrency, setMainCurrency] = useState('');
    const [spare, setSpare] = useState(formData?.spare || '');

    const [alertError, setAlertError] = useState(false);
    const [textAlertError, setTextAlertError] = useState('');
    const [errorsText, setErrorsText] = useState(false);
    const [showConvertibleAmount, setShowConvertibleAmount] = useState(false);
    // const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        if (mainCurrency !== 980) {
            setShowConvertibleAmount(true);
            // setButtonText("Конвертувати");
        } else {
            setShowConvertibleAmount(false);
            // setButtonText("Прорахувати");
        }
    }, [mainCurrency]);

    const handleInputChangeMain = (e) => {
        const value = parseFloat(e.target.value);
        setInitialAmount(value);
    };

    const handleChangeMainCurrency = (e) => {
        const value = e.target.value;
        setMainCurrency(value);
    };

    const handleChangeSpare = (e) => {
        const value = e.target.value;
        setSpare(value);
    };

    const calculateAmountInUAH = () => {
        if (initialAmount !== null && mainCurrency !== '') {
            const targetCurrency = currency.find((item) => item.r030 === mainCurrency);
            if (!targetCurrency) {
                setAlertError(true);
                setTextAlertError('Курс валюти не знайдено.');
                return;
            }

            const saleRate = targetCurrency.sale;

            let amountInUAH;
            if (mainCurrency === 980) {
                amountInUAH = initialAmount;
            } else {
                amountInUAH = initialAmount * saleRate;
            }

            dispatch(updateFormData({
                salary: amountInUAH
            }));
            setConvertibleAmount(parseFloat(amountInUAH.toFixed(2)));
        }
    };

    useEffect(() => {
        calculateAmountInUAH();
    }, [initialAmount, mainCurrency]);

    const handleConvert = () => {
        if (!initialAmount || !mainCurrency) {
            setErrorsText(true);
            return;
        }

        dispatch(updateFormData({
            // salary: convertibleAmount,
            spare: spare
        }));

        calculateAmountInUAH();
    };

    return (
        <div className={'start-form'}>
            <div className={"main-form"}>
                <div className={"main-form-text-field"}>
                    <TextField
                        id="outlined-basic"
                        label="Початкова сума"
                        type="number"
                        value={initialAmount}
                        variant="outlined"
                        size="small"
                        onChange={handleInputChangeMain}
                        inputProps={{ min: 0 }}
                        error={errorsText && !initialAmount}
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
                {showConvertibleAmount && (
                    <div className={"main-form-text-field"}>
                        <TextField
                            id="outlined-basic"
                            label="Сума в UAH"
                            type="number"
                            value={convertibleAmount}
                            variant="outlined"
                            size="small"
                            disabled
                            inputProps={{ min: 0 }}
                            error={errorsText && !convertibleAmount}
                        />
                    </div>
                )}
            </div>
            <div className={"main-form"}>
                <div className={"main-form-text-field"}>
                    <TextField
                        id="outlined-basic"
                        label="Заощадження"
                        type="number"
                        value={spare}
                        onChange={handleChangeSpare}
                        variant="outlined"
                        size="small"
                        inputProps={{ min: 0 }}
                        error={errorsText && !spare}
                    />
                </div>
                <div className={"main-form-text-field"}>
                    <Button
                        variant="contained"
                        onClick={handleConvert}
                    >
                        Планування бюджету
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