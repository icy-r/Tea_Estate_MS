import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, Snackbar } from "@mui/material";

const ConfigureTransport = () => {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",  // Include the ID in the form data
    type: "",
    dailyOccurrence: 1,
    vehicle_id: "",
    route_id: "",
  });

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch vehicles and routes when component mounts
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/vehicles");
        setVehicles(response.data); // Assuming response.data contains vehicles data
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        showSnackbar("Error fetching vehicles.");
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/routes");
        setRoutes(response.data); // Assuming response.data contains routes data
      } catch (error) {
        console.error("Error fetching routes:", error);
        showSnackbar("Error fetching routes.");
      }
    };

    fetchVehicles();
    fetchRoutes();
  }, []);

  // Generate a simple ID using timestamp + random number
  const generateSimpleId = () => {
    return `TID-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate a simple ID for the transport before sending
    const transportData = {
      ...formData,
      id: generateSimpleId(),  // Generating a simple ID for the transport
    };

    try {
      const response = await axios.post("/transports", transportData);
      console.log("Transport created:", response.data);
      showSnackbar("Transport created successfully!");

      // Reset form data
      setFormData({
        id: "",
        type: "",
        dailyOccurrence: 1,
        vehicle_id: "",
        route_id: "",
      });
    } catch (error) {
      console.error("Error creating transport:", error);
      showSnackbar("Error creating transport.");
    }
  };

  // Snackbar handling
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="configure-transport-form p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Configure Transport</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Type input */}
      
        <FormControl fullWidth variant="outlined">
          <InputLabel id="Type1">Type</InputLabel>
          <Select
            labelId="route-select-label"
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Type"
            required
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            <MenuItem value="Employee transportation">Employee Transportation</MenuItem>
            <MenuItem value="Harvest transportation">Harvest Transportation</MenuItem>
            <MenuItem value="Delivery transportation">Delivery Transportation</MenuItem>
          </Select>
        </FormControl>


        {/* Daily Occurrence input */}
        <TextField
          label="Daily Occurrence"
          type="number"
          name="dailyOccurrence"
          value={formData.dailyOccurrence}
          onChange={handleChange}
          inputProps={{ min: 1, max: 3 }} // Set min to 1 and max to 3
          required
          fullWidth
          variant="outlined"
        />

        {/* Vehicle dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
          <Select
            labelId="vehicle-select-label"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
            label="Vehicle"
            required
          >
            <MenuItem value="">
              <em>Select Vehicle</em>
            </MenuItem>
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                Driver:{vehicle.driver_id} - {vehicle.id} - {vehicle.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Route dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel id="route-select-label">Route</InputLabel>
          <Select
            labelId="route-select-label"
            name="route_id"
            value={formData.route_id}
            onChange={handleChange}
            label="Route"
            required
          >
            <MenuItem value="">
              <em>Select Route</em>
            </MenuItem>
            {routes.map((route) => (
              <MenuItem key={route.id} value={route.id}>
                Route: {route.id}- Distance: {route.distance}km - Trips/Day: {route.tripsPerDayNeeded}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ bgcolor: '#15F5BA', '&:hover': { bgcolor: '#1AACAC' },boxShadow: 'none', color: 'black', border: 'none' }}
          
        >
          Add a Transport
        </Button>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position in top right
        TransitionComponent={(props) => (
          <div {...props} style={{ transition: "transform 0.5s ease" }} />
        )}
      />
    </div>
  );
};

export default ConfigureTransport;