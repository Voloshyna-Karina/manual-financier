import React, {useEffect, useState} from "react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './Calculator.css';
import Modal from '../Modal/Modal.jsx';
import {useSelector} from "react-redux";

const Calculator = ({handleComplete}) => {
    const formData = useSelector((state) => state?.form?.formData?.startPlanning);
    const [salary, setSalary] = useState(formData?.salary || '')
    const [result, setResult] = useState('');
    const [table, setTable] = useState([
        { id: 1, title: 'Оренда квартири', amountExpenses: '' },
        { id: 2, title: 'Комуналка', amountExpenses: '' },
        { id: 3, title: 'Транспорт', amountExpenses: '' },
        { id: 4, title: 'Мобільний телефон', amountExpenses: '' },
        { id: 5, title: 'Їжа', amountExpenses: '' },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [errorsTable, setErrorsTable] = useState({});
    const [errorsModal, setErrorsModal] = useState(false);

    useEffect(() => {
        if (formData !== undefined) {
            setSalary(formData);
        }
    }, [formData]);

    // console.log(JSON.stringify(salary));

    const [newRow, setNewRow] = useState({
        title: '',
        amountExpenses: ''
    });

    const handleAmountExpensesChange = (id, event) => {
        const updatedRows = table.map(row =>
            row.id === id ? { ...row, amountExpenses: event.target.value } : row
        );
        setTable(updatedRows);

        if (errorsTable[id] && event.target.value) {
            const newErrors = { ...errorsTable };
            delete newErrors[id];
            setErrorsTable(newErrors);
        }
    };

    const handleNewRowChange = (event) => {
        const { name, value } = event.target;
        setNewRow(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addRow = () => {
        if (!newRow.title || !newRow.amountExpenses) {
            setErrorsModal(true);
            return;
        }

        const updatedRows = [
            ...table,
            {
                id: table.length + 1,
                ...newRow,
            },
        ];
        setTable(updatedRows);
        handleCloseModal();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setNewRow({
            title: '',
            amountExpenses: ''
        });
        setErrorsModal(false);
    };

    const handleOpenModalDelete = (id) => {
        setRowToDelete(id);
        setOpenModalDelete(true);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setRowToDelete(null);
    };

    const handleDeleteRow = () => {
        if (rowToDelete) {
            const updatedRows = table.filter(row => row.id !== rowToDelete);
            setTable(updatedRows);
            handleCloseModalDelete();
        }
    };

    const handleConvert = () => {
        const newErrors = {};
        table.forEach(row => {
            if (!row.amountExpenses) {
                newErrors[row.id] = true;
            }
        });
        setErrorsTable(newErrors);

        if (Object.keys(newErrors).length === 0) {
            handleComplete();
            return;
        }
    };

    return (
        <div className="calculator">
            <Paper className={"calculator-form"} elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Категорія</TableCell>
                                <TableCell>Сума витрат</TableCell>
                                <TableCell>Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell className={"calculator-table-percent"}>
                                        <Typography variant="body2" gutterBottom>
                                            {row.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell className="calculator-table-sum">
                                        <TextField
                                            size="small"
                                            value={row.amountExpenses}
                                            onChange={(e) => handleAmountExpensesChange(row.id, e)}
                                            fullWidth
                                            error={errorsTable[row.id]}
                                            // label="Сума витрат"
                                        />
                                    </TableCell>
                                    <TableCell className="calculator-table-delete">
                                        <IconButton onClick={() => handleOpenModalDelete(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="calculator-button-group">
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={handleOpenModal}
                        >
                            <AddIcon />
                        </Button>

                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={handleConvert}
                        >
                            Прорахувати
                        </Button>
                    </div>
                </TableContainer>
            </Paper>

            <Modal isOpen={openModal} onClose={handleCloseModal}>
                {/*<Typography variant='h5' sx={{textAlign: "center"}}>ff</Typography>*/}
                <TextField
                    variant="outlined"
                    name="title"
                    label="Назва категорії"
                    value={newRow.title}
                    onChange={handleNewRowChange}
                    fullWidth
                    margin="normal"
                    sx={{ mb: 2.5 }}
                    error={errorsModal && !newRow.title}
                    // helperText={errorsModal && !newRow.title ? "Це поле обов'язкове" : ""}
                />
                <TextField
                    name="amountExpenses"
                    label="Сума витрат"
                    value={newRow.amountExpenses}
                    onChange={handleNewRowChange}
                    fullWidth
                    margin="normal"
                    sx={{ mb: 2.5 }}
                    error={errorsModal && !newRow.amountExpenses}
                    // helperText={errorsModal && !newRow.amountExpenses ? "Це поле обов'язкове" : ""}
                />
                <div className={"calculator-button-group-modal"}>
                    <Button onClick={handleCloseModal}>Скасувати</Button>
                    <Button onClick={addRow} color="primary">Додати</Button>
                </div>
            </Modal>

            <Modal isOpen={openModalDelete} onClose={handleCloseModalDelete}>
                <DialogTitle>Видалення рядка</DialogTitle>
                <DialogContent>
                    <Typography>Ви впевнені, що хочете видалити цей рядок?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalDelete}>Скасувати</Button>
                    <Button onClick={handleDeleteRow} color="error">Видалити</Button>
                </DialogActions>
            </Modal>
        </div>
    );
};

export default Calculator;