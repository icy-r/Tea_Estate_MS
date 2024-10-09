import StatusMain from "../components/StatusMain";
import DataDisplay from "../components/DataDisplay";

const machineHome = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <StatusMain />
      <DataDisplay />
    </div>
  );
};

export default machineHome;
