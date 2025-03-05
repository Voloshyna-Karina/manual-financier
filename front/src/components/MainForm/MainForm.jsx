import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { useState } from "react";
import './MainForm.css';

const currency = [
    {
        "r030": 985,
        "txt": "Злотий",
        "sale": 10.45,
        "buy": 10.40,
        "cc": "PLN"
    },
    // {
    //     "r030": 980,
    //     "txt": "Гривня",
    //     "sale": 1,
    //     "buy": 1,
    //     "cc": "UAH"
    // },
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

const MainForm = () => {
    const [initialAmount, setInitialAmount] = useState(null);
    const [convertibleAmount, setConvertibleAmount] = useState(null);
    const [mainCurrency, setMainCurrency] = useState('');
    const [alertError, setAlertError] = useState(false);
    const [textAlertError, serTextAlertError] = useState('');

    const handleInputChangeMain = (e) => {
        const value = parseFloat(e.target.value);
        setInitialAmount(value);
    };

    const handleChangeMainCurrency = (e) => {
        const selectedCurrency = e.target.value;
        setMainCurrency(selectedCurrency);
    };

    const handleConvert = () => {
        if (initialAmount === null || mainCurrency === '') {
            setAlertError(true)
            serTextAlertError('Будь ласка, введіть суму та оберіть валюту.')
            return;
        }

        const targetCurrency = currency.find((item) => item.r030 === mainCurrency);
        if (!targetCurrency) {
            setAlertError(true)
            serTextAlertError('Курс валюти не знайдено.')
            return;
        }

        const saleRate = targetCurrency.sale;
        const convertedAmount = initialAmount / saleRate;
        setConvertibleAmount(parseFloat(convertedAmount.toFixed(2)));
    };

    return (
        <div>
            <div className={"main-form"}>
                <div className={"main-form-text-field"}>
                    <TextField
                        id="outlined-basic"
                        label="Початкова сума"
                        type="number"
                        value={initialAmount ?? ""}
                        variant="outlined"
                        size="small"
                        onChange={handleInputChangeMain}
                        inputProps={{ min: 0 }}
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
                        >
                            {currency.map((item) => (
                                <MenuItem key={item.r030} value={item.r030}>
                                    {item.cc}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={"main-form-text-field"}>
                    <TextField
                        id="outlined-basic"
                        label="Конвертована сума"
                        type="number"
                        value={convertibleAmount ?? ""}
                        variant="outlined"
                        size="small"
                        disabled
                        inputProps={{ min: 0 }}
                    />
                </div>
                <div className={"main-form-text-field"}>
                    <Button
                        variant="contained"
                        onClick={handleConvert}
                    >
                        Конвертувати
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

export default MainForm;