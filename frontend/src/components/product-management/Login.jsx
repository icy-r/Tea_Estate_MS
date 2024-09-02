import React from 'react';
import ActionButtonColor from "@divs/ActionButtonColor.jsx";
import TextField from '@mui/material/TextField';
//path "../src/pages/productManagement/Login.jsx"
const Login = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      
      {/* Left section with logo and system description */}
      <div className="md:w-1/3 w-full bg-color_focus text-white flex flex-col justify-center items-center p-8">
        <img src="../src/assets/logo.png" alt="logo" className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8" />
        <div className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">Tea Estate</div>
        <div className="text-2xl md:text-4xl font-bold mb-2">Manage and Handle</div>
        <div className="text-sm md:text-lg text-center">Fully functional tea estate management system</div>
      </div>
      
      {/* Right section with login form */}
      <div className="md:w-2/3 w-full flex justify-center items-center p-4 md:p-0">
        <div className="w-full max-w-md bg-white rounded-lg p-8 md:p-10 ">
        <img src="../src/assets/logo.png" alt="logo" className="w-5 h-5 ml-7" />
        <div className="font-bold ml-7 mb-4"> Tea Estate</div>
          <div className="text-xl  text-color_focus ml-7">Login into System</div>
          
        <form className="p-6 bg-white">
            <div className="mb-4">
            <TextField label="Email "variant="outlined" fullWidth id="email" type="email"/>
            </div>
            
            <div className="mb-6">
              <TextField label="Password" variant="outlined" fullWidth id="password" type="password"  />
            </div>
            
            <div className="mb-4 flex items-center">
              <input type="checkbox" className="form-checkbox text-color_focus h-4 w-4 mx-2" />
              <span className="text-sm text-color_focus">I accept the <a href="#" className="text-color_button underline">Terms and Conditions</a></span>
            </div>
            
            <div className="flex items-center justify-center mt-6">
              <ActionButtonColor text="Login" href="login" />
            </div>
            
            <div className="mt-6 text-center text-sm text-color_focus">
              Don't have an account? <a href="#" className="text-color_button underline">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;