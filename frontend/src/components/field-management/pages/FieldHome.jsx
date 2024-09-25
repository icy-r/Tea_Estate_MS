import React from 'react';
import StatusMain from "../component/StatusMain";
import ErrorBoundary from "../../ErrorBoundary";
import Chart from "../component/Chart";

const FieldHome = () => {
  return (
    <ErrorBoundary>
      <StatusMain />
      <Chart />
    </ErrorBoundary>
  );
};

export default FieldHome;