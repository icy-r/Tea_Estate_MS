import React from 'react';
import StatusMain from "../component/StatusMain";
import ErrorBoundary from "../../ErrorBoundary";

const FieldHome = () => {
    return (
         <ErrorBoundary>
                <StatusMain/>
            </ErrorBoundary>
    );
};

export default FieldHome;