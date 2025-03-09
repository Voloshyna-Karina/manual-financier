import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { getCurrencies } from "../../actions/userActions.js";
import generateApiToken from "../../helpers/generateApiToken.js";
import { Box, Button, Step, StepButton, Stepper, Typography } from "@mui/material";
import StartForm from "../StartForm/StartForm.jsx";
import Calculator from "../Calculator/Calculator.jsx";

const steps = ['Внесення даних', 'Планування витрат', 'Результат заощадження'];

const Header = ({ ...props }) => {
    const dispatch = useDispatch();

    const token = generateApiToken();

    // useEffect(() => {
    //     dispatch(getCurrencies(token))
    //         .then(res => console.log(res))
    //         .catch(err => console.error(err));
    // }, [dispatch]);

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <StartForm />;
            case 1:
                return <Calculator />;
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
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Заново</Button>
                            </Box>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {renderStepContent(activeStep)}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Назад
                                </Button>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption">
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                                ? 'Закінчити'
                                                : 'Продовжити'}
                                        </Button>
                                    ))}
                            </Box>
                        </Fragment>
                    )}
                </div>
            </Box>
        </div>
    );
};

export default Header;