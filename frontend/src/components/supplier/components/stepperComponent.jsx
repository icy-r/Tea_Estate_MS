import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const StepperComponent = ({ data }) => {
    // Define the steps
    const steps = [
        'Pending',
        'Preparing',
        'Shipping',
        'Handovered',
        'Completed'
    ];

    // Determine the active step based on the order status
    const getActiveStep = (status) => {
        return steps.indexOf(status);
    };

    const activeStep = getActiveStep(data.status); // Get the active step based on the passed status

    return (
        <Stepper activeStep={activeStep}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default StepperComponent;
