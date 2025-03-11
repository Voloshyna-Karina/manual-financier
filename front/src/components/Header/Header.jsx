import {useDispatch, useSelector} from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { getCurrencies } from "../../actions/userActions.js";
import generateApiToken from "../../helpers/generateApiToken.js";
import { Box, Button, Step, StepButton, Stepper, Typography } from "@mui/material";
import StartForm from "../StartForm/StartForm.jsx";
import Calculator from "../Calculator/Calculator.jsx";
import PropTypes from "prop-types";

const steps = ['Внесення даних', 'Планування витрат', 'Результат заощадження'];

const Header = ({ nextStep, onStepChange, ...props }) => {
    const dispatch = useDispatch();
    const token = generateApiToken();

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    useEffect(() => {
        if (nextStep !== undefined && nextStep >= 0 && nextStep < steps.length) {
            setActiveStep(nextStep);
        }
    }, [nextStep]);

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(completed).length;

    const isLastStep = () => activeStep === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
        if (onStepChange) onStepChange(newActiveStep);
    };

    const handleBack = () => {
        const newActiveStep = activeStep - 1;
        setActiveStep(newActiveStep);
        if (onStepChange) onStepChange(newActiveStep);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
        if (onStepChange) onStepChange(step);
    };

    const handleComplete = () => {
        const newCompleted = {
            ...completed,
            [activeStep]: true,
        };
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        if (onStepChange) {
            onStepChange(0);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <StartForm handleComplete={handleComplete} />;
            case 1:
                return <Calculator handleComplete={handleComplete} />;
            case 2:
                return <Typography>Результат заощадження</Typography>;
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you're finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Заново</Button>
                            </Box>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {renderStepContent(activeStep)}
                            {/*<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>*/}
                            {/*    <Button*/}
                            {/*        color="inherit"*/}
                            {/*        disabled={activeStep === 0}*/}
                            {/*        onClick={handleBack}*/}
                            {/*        sx={{ mr: 1 }}*/}
                            {/*    >*/}
                            {/*        Назад*/}
                            {/*    </Button>*/}
                            {/*    {activeStep !== steps.length - 1 && (*/}
                            {/*        <Button onClick={handleComplete}>*/}
                            {/*            {completedSteps() === totalSteps() - 1*/}
                            {/*                ? 'Закінчити'*/}
                            {/*                : 'Продовжити'}*/}
                            {/*        </Button>*/}
                            {/*    )}*/}
                            {/*</Box>*/}
                        </Fragment>
                    )}
                </div>
            </Box>
        </div>
    );
};

Header.propTypes = {
    nextStep: PropTypes.number,
    onStepChange: PropTypes.func,
    handleComplete: PropTypes.func,
};

export default Header;