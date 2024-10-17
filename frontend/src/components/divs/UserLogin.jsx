/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import logo from "@assets/logo.png";
import * as authService from "../../services/auth-service.js";
import { Link } from "@mui/joy"; // Keep this if you use Link elsewhere
import { motion } from "framer-motion";

const UserLogin = ({ handleAuthEvt }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Check if form is valid
  const isFormInvalid = () => !(formData.email && formData.password);

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true);
    
    const { email, password } = formData;

    // Hard-coded login logic
    if (email === "samu@gmail.com" && password === "samu@123") {
      navigate("/admin/driver/");
    } else if (email === "janu@gmail.com" && password === "janu@123") {
      navigate("/admin/drivers/");
    } else if (email === "rid@gmail.com" && password === "rid@123") {
      navigate("/admin/supplier/");
    } else if (email === "subo@gmail.com" && password === "subo@123") {
      navigate("/admin/suppliers/");
    } else {
      setError("Invalid email or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col md:flex-row h-screen w-screen z-50"
    >
      {/* Left Side */}
      <div className="md:w-1/3 w-full bg-color_focus text-white flex flex-col justify-center p-8 pl-14">
        <div className="flex mb-2">
          <img src={logo} alt="logo" className="w-13 h-13 md:w-12 md:h-13 " />
          <div className="text-4xl md:text-lg ml-4">
            Tea <br />
            Estate Management
          </div>
        </div>
        <div className="text-2xl md:text-5xl font-light mb-3 font-sans">
          Pure and Simple
        </div>
        <div className="text-xs md:text-xm font-extralight">
          Taste comes from the heart
        </div>
      </div>
      
      {/* Right Side */}
      <div className="md:w-2/3 w-full flex justify-center items-center p-4 md:p-0 bg-gray-800">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-lg p-8 md:p-10"
        >
          <img src={logo} alt="logo" className="w-5 h-5 ml-7" />
          <div className="font-bold ml-7 mb-4 dark:text-black">Tea Estate</div>
          <div className="text-xl text-color_focus ml-7">User Login</div>

          {/* Form */}
          <form className="p-6 bg-white" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 mb-4 text-sm p-2 bg-red-100 rounded"
              >
                {error}
              </motion.div>
            )}
            <div className="mb-4">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center mt-6 gap-3">
              <Link to="/">Cancel</Link>
              <motion.button
                type="submit"
                className="bg-color_button hover:bg-color_button_hover text-white font-bold py-2 px-4 rounded"
                disabled={isFormInvalid() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserLogin;
