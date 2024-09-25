import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import StatusCard from "../../divs/StatusCard.jsx";

const StatusMain = () => {
  const [fields, setFields] = useState([]);
  const [labours, setLabours] = useState([]);
  const [harvest, setHarvest] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [fieldsRes, laboursRes, harvestsRes] = await Promise.all([
          axios.get("/fields"),
          axios.get("/labours"),
          axios.get("/harvests")
        ]);

        const fieldsData = fieldsRes.data;
        const laboursData = laboursRes.data;
        const harvestData = harvestsRes.data;

        setFields(fieldsData);
        setLabours(laboursData);
        setHarvest(harvestData);

        // Calculate stats and format them for StatusCard
        const fieldsCount = fieldsData.length;
        const totalFieldArea = fieldsData.reduce((acc, field) => acc + field.area, 0);
        const totalHarvest = harvestData.reduce((acc, harvest) => acc + harvest.total, 0);
        const laboursCount = laboursData.length;

        // Create formatted data for StatusCard
        setCount([
          { title: "Fields", count: fieldsCount },
          { title: "Total Area of Fields", count: totalFieldArea + " sq.m" },
          { title: "Total Harvest", count: totalHarvest + " kg" },
          { title: "Labours", count: laboursCount },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className='w-full flex items-center bg-color_extra justify-between p-2'>
      <StatusCard data={count} />
    </div>
  );
}

export default StatusMain;
