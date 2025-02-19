import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import axios from "../../../services/axios.js";
import moment from "moment"; // Using moment.js for date handling

const FertilizerTable = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the fertilizer data from the server
    const fetchFertilizers = async () => {
      try {
        const response = await axios.get("/fertilizers");
        setFertilizers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch fertilizers.");
        setLoading(false);
      }
    };

    fetchFertilizers();
  }, []);

  // Function to calculate remaining days from current date
  const calculateRemainingDays = (nextDate) => {
    if (!nextDate) return "NA";
    const today = moment();
    const fertilizationDate = moment(nextDate);
    const differenceInDays = fertilizationDate.diff(today, "days");
    return differenceInDays > 0 ? `${differenceInDays} days` : "Due/Overdue";
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom>
        Fertilizer Schedule Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Next Fertilization Date</TableCell>
              <TableCell>Remaining Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fertilizers.map((fertilizer) => (
              <TableRow key={fertilizer.id}>
                <TableCell>{fertilizer.fieldName}</TableCell>
                <TableCell>
                  {fertilizer.nextFertilizationDate
                    ? moment(fertilizer.nextFertilizationDate).format(
                        "YYYY-MM-DD"
                      )
                    : "NA"}
                </TableCell>
                <TableCell>
                  {fertilizer.nextFertilizationDate
                    ? calculateRemainingDays(fertilizer.nextFertilizationDate)
                    : "NA"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FertilizerTable;
