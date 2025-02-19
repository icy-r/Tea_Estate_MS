import React, { useState, useEffect, useRef } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import axios from "../../../services/axios.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";

const FieldAnalysis = () => {
  const [harvestData, setHarvestData] = useState([]);
  const [harvestlogData, setHarvestlogData] = useState([]);
  const [fieldSummary, setFieldSummary] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedField, setSelectedField] = useState("all");
  const [fields, setFields] = useState([]);

  // References for charts to properly clean up
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    fetchFields();
    fetchHarvestData();
    fetchHarvestlogData();
  }, [selectedMonth]);

  const fetchFields = async () => {
    try {
      const response = await axios.get("/fields");
      setFields(response.data);
      if (response.data.length > 0) {
        setSelectedField(response.data[0].name);
      }
    } catch (error) {
      console.error("Error fetching fields", error);
    }
  };

  const fetchHarvestlogData = async () => {
    try {
      const startDate = format(startOfMonth(selectedMonth), "yyyy-MM-dd");
      const endDate = format(endOfMonth(selectedMonth), "yyyy-MM-dd");
      const response = await axios.get(
        `/harvestlogs?start=${startDate}&end=${endDate}`
      );
      setHarvestlogData(response.data);
    } catch (error) {
      console.error("Error fetching harvest log data", error);
    }
  };

  const fetchHarvestData = async () => {
    try {
      const startDate = format(startOfMonth(selectedMonth), "yyyy-MM-dd");
      const endDate = format(endOfMonth(selectedMonth), "yyyy-MM-dd");
      const response = await axios.get(
        `/harvests?start=${startDate}&end=${endDate}`
      );
      setHarvestData(response.data);
      calculateFieldSummary(response.data);
    } catch (error) {
      console.error("Error fetching harvest data", error);
    }
  };

  const calculateFieldSummary = (data) => {
    const summary = data.reduce((acc, harvest) => {
      if (!acc[harvest.field_name]) {
        acc[harvest.field_name] = {
          totalHarvest: 0,
          bestQuality: 0,
          goodQuality: 0,
          damagedQuality: 0,
        };
      }
      acc[harvest.field_name].totalHarvest += harvest.total;
      acc[harvest.field_name].bestQuality += harvest.best_qnty;
      acc[harvest.field_name].goodQuality += harvest.good_qnty;
      acc[harvest.field_name].damagedQuality += harvest.damaged_qnty;
      return acc;
    }, {});
    setFieldSummary(Object.entries(summary));
  };

  // Chart.js data and options for each chart
  const barChartData = {
    labels: fieldSummary.map(([field]) => field),
    datasets: [
      {
        label: "Total Harvest (kg)",
        data: fieldSummary.map(([, stats]) => stats.totalHarvest),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Best Quality", "Good Quality", "Damaged Quality"],
    datasets: [
      {
        data: [
          fieldSummary.find(([field]) => field === selectedField)?.[1]
            ?.bestQuality || 0,
          fieldSummary.find(([field]) => field === selectedField)?.[1]
            ?.goodQuality || 0,
          fieldSummary.find(([field]) => field === selectedField)?.[1]
            ?.damagedQuality || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"],
      },
    ],
  };

  const lineChartData = {
    labels: eachDayOfInterval({
      start: startOfMonth(selectedMonth),
      end: endOfMonth(selectedMonth),
    }).map((date) => format(date, "dd-MM")),
    datasets: [
      {
        label: "Total Harvest",
        data: eachDayOfInterval({
          start: startOfMonth(selectedMonth),
          end: endOfMonth(selectedMonth),
        }).map((date) => {
          const logForDate = harvestlogData.find(
            (log) =>
              format(new Date(log.date), "yyyy-MM-dd") ===
              format(date, "yyyy-MM-dd")
          );
          return logForDate
            ? logForDate.logs.reduce((sum, log) => sum + log.totalAll, 0)
            : 0;
        }),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Cleanup charts properly when component unmounts or dependencies change
  useEffect(() => {
    return () => {
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (lineChartRef.current) lineChartRef.current.destroy();
    };
  }, []);

  const handlePrint = async () => {
    const doc = new jsPDF();

    // Set title for the PDF
    doc.text("Field Analysis Summary", 10, 10);
    // Add the current date to the PDF
    const currentDate = format(new Date(), "dd-MM-yyyy");
    doc.text(`Date: ${currentDate}`, 150, 10); // Adjust the X position to align on the same row
    // Add the table to the PDF
    doc.autoTable({
      startY: 20, // Adjust the Y position so the table appears at the top
      head: [
        [
          "Field Name",
          "Total Harvest (kg)",
          "Best Quality (kg)",
          "Good Quality (kg)",
          "Damaged Quality (kg)",
        ],
      ],
      body: fieldSummary.map(([field, stats]) => [
        field,
        stats.totalHarvest,
        stats.bestQuality,
        stats.goodQuality,
        stats.damagedQuality,
      ]),
    });

    // Capture the bar chart and add it to the PDF
    const barChartCanvas = barChartRef.current.canvas;
    const barChartImage = await html2canvas(barChartCanvas).then((canvas) =>
      canvas.toDataURL("image/png")
    );
    doc.addImage(
      barChartImage,
      "PNG",
      10,
      doc.autoTable.previous.finalY + 10,
      190,
      80
    ); // Adjust position and size as needed

    // Capture the pie chart and add it to the PDF
    const pieChartCanvas = pieChartRef.current.canvas;
    const pieChartImage = await html2canvas(pieChartCanvas).then((canvas) =>
      canvas.toDataURL("image/png")
    );
    doc.addImage(
      pieChartImage,
      "PNG",
      10,
      doc.autoTable.previous.finalY + 100,
      90,
      80
    ); // Adjust position and size as needed

    // Capture the line chart and add it to the PDF
    const lineChartCanvas = lineChartRef.current.canvas;
    const lineChartImage = await html2canvas(lineChartCanvas).then((canvas) =>
      canvas.toDataURL("image/png")
    );
    doc.addImage(
      lineChartImage,
      "PNG",
      105,
      doc.autoTable.previous.finalY + 100,
      90,
      80
    ); // Adjust position and size as needed

    // Save the PDF
    doc.save("field-analysis-summary.pdf");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Field Analysis Summary
        </Typography>

        <Grid container spacing={3} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} md={4}>
            <DatePicker
              views={["year", "month"]}
              label="Select Month"
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="field-select-label">Select Field</InputLabel>
              <Select
                labelId="field-select-label"
                value={selectedField}
                label="Select Field"
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {fields.map((field) => (
                  <MenuItem key={field.id} value={field.name}>
                    {field.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={handlePrint}>
              Print Summary
            </Button>
          </Grid>
        </Grid>

        {/* Table for field summary */}
        <Paper style={{ marginBottom: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field Name</TableCell>
                <TableCell>Total Harvest (kg)</TableCell>
                <TableCell>Best Quality (kg)</TableCell>
                <TableCell>Good Quality (kg)</TableCell>
                <TableCell>Damaged Quality (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldSummary.map(([field, stats]) => (
                <TableRow key={field}>
                  <TableCell>{field}</TableCell>
                  <TableCell>{stats.totalHarvest}</TableCell>
                  <TableCell>{stats.bestQuality}</TableCell>
                  <TableCell>{stats.goodQuality}</TableCell>
                  <TableCell>{stats.damagedQuality}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Field-wise Harvest Comparison
                </Typography>
                <div style={{ height: "300px" }}>
                  <Bar
                    ref={barChartRef}
                    data={barChartData}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Total Harvest (kg)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Harvest Quality Distribution for {selectedField}
                </Typography>
                <div style={{ height: "300px" }}>
                  <Pie
                    ref={pieChartRef}
                    data={pieChartData}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Harvest Log for {format(selectedMonth, "MMMM yyyy")}
                </Typography>
                <div style={{ height: "300px" }}>
                  <Line
                    ref={lineChartRef}
                    data={lineChartData}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Total Harvest (kg)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Harvest Log Table
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Total Harvest (kg)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {harvestlogData.map((harvestlog) => (
                      <TableRow key={harvestlog.id}>
                        <TableCell>
                          {format(new Date(harvestlog.date), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>
                          {harvestlog.logs.reduce(
                            (sum, log) => sum + log.totalAll,
                            0
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </LocalizationProvider>
  );
};

export default FieldAnalysis;
