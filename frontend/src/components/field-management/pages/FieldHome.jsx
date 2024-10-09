import React from 'react';
import StatusMain from "../component/StatusMain";
import ErrorBoundary from "../../ErrorBoundary";
import Chart from "../component/Chart";
import BarChart from "../component/BarChart";

const FieldHome = () => {
  return (
    <ErrorBoundary>
      <StatusMain />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <Chart />
        </div>
        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <BarChart />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FieldHome;