import StatusMain from "../components/StatusMain.jsx";
import ErrorBoundary from "../../ErrorBoundary.jsx";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
import DataDisplay from "../components/DataDisplay.jsx";

const Home = () => {
  //   const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center">
      <ErrorBoundary>
        <StatusMain />
      </ErrorBoundary>
      {/* <Button variant="contained" color="primary">
        Add new machine
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/admin/repair/all");
        }}
      >
        Show all machines
      </Button> */}
      <DataDisplay />
    </div>
  );
};

export default Home;