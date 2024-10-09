/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import logo from "@assets/logo.png";
import * as authService from "../../services/auth-service.js";
import { Link } from "@mui/joy";

const Login = ({ handleAuthEvt }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const { email, password } = formData;

  const isFormInvalid = () => {
    return !(email && password);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await authService.login(formData);
      handleAuthEvt();
      navigate("/admin/");
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row h-screen w-screen z-50">
      <div className="md:w-1/3 w-full bg-color_focus text-white flex flex-col justify-center p-8 pl-14">
        <div className="flex mb-2">
          <img src={logo} alt="logo" className="w-13 h-13 md:w-12 md:h-13 " />
          <div className="text-4xl md:text-lg ml-4">
            Tea <br />
            Estate Management
          </div>
        </div>
        <div className="text-2xl md:text-5xl font-light mb-3 font-sans">
          Manage and Handle
        </div>
        <div className="text-xs md:text-xm font-extralight">
          Fully functional tea estate management system
        </div>
      </div>
      <div className="md:w-2/3 w-full flex justify-center items-center p-4 md:p-0 bg-gray-800">
        <div className="w-full max-w-md bg-white rounded-lg p-8 md:p-10">
          <img src={logo} alt="logo" className="w-5 h-5 ml-7" />
          <div className="font-bold ml-7 mb-4 dark:text-black">Tea Estate</div>
          <div className="text-xl text-color_focus ml-7">Login into System</div>
          <form className="p-6 bg-white" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
            <div className="mb-4">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                id="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                id="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center mt-6 gap-3">
              {/*<ActionButtonColor text="Login" type="submit"/>*/}
              <Link to="/">Cancel</Link>
              <button
                type="submit"
                className="bg-color_button hover:bg-color_button_hover text-white font-bold py-2 px-4 rounded"
                disabled={isFormInvalid()}
              >
                {" "}
                Login
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-color_focus">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-color_button underline">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
