import React from 'react';
import ActionButtonColor from "@divs/ActionButtonColor.jsx";
import TextField from '@mui/material/TextField';
//path "../src/pages/productManagement/Register.jsx"
const Register = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* Left section with logo and system description */}
      <div className="md:w-1/3 w-full bg-color_focus text-white flex flex-col justify-center p-8 pl-14">
        <div className='flex mb-2'>
          <img src="../src/assets/logo.png" alt="logo" className="w-13 h-13 md:w-12 md:h-13" />
          <div className="text-4xl md:text-lg font-extralight ml-4">Tea <br />Estate Management</div>
        </div>
        <div className="text-2xl md:text-5xl font-light mb-3 font-sans">Manage and Handle</div>
        <div className="text-xs md:text-xm font-extralight">Fully functional tea estate management system</div>
      </div>

      {/* Right section with register form */}
      <div className="md:w-2/3 w-full flex justify-center items-center p-4 md:p-0">
        <div className="w-full px-[20%] bg-white rounded-lg ">
          <img src="../src/assets/logo.png" alt="logo" className="w-5 h-5 ml-7" />
          <div className="font-bold ml-7 mb-4">Tea Estate</div>
          <div className="text-xl text-color_focus ml-7">Register to System</div>

          <form className="pt-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <TextField label="First Name" variant="outlined" fullWidth id="fName" type="text" />
              </div>
              <div className="mb-4">
                <TextField label="Last Name" variant="outlined" fullWidth id="lName" type="text" />
              </div>
              <div className="mb-4">
                <TextField label="Position" variant="outlined" fullWidth id="position" type="text" />
              </div>
              <div className="mb-4">
                <TextField label="Company" variant="outlined" fullWidth id="company" type="text" />
              </div>
              <div className="mb-4">
                <TextField label="Company Address" variant="outlined" fullWidth id="companyAddress" type="text" />
              </div>
              <div className="mb-4">
                <TextField label="Telephone" variant="outlined" fullWidth id="telephone" type="text" />
              </div>
              <div className="mb-4">
                <TextField label="Email" variant="outlined" fullWidth id="email" type="email" />
              </div>
              <div className="mb-4">
                <TextField label="Username" variant="outlined" fullWidth id="userName" type="text" />
              </div>
              <div className="md:col-span-2 mb-6">
                <TextField label="Password" variant="outlined" fullWidth id="password" type="password" />
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input type="checkbox" className="form-checkbox text-color_focus h-4 w-4 mx-2" />
              <span className="text-sm text-color_focus">I accept the <a href="#" className="text-color_button underline">Terms and Conditions</a></span>
            </div>

            <div className="flex items-center justify-center mt-6">
              <ActionButtonColor text="Register" href="register" />
            </div>

            <div className="mt-6 text-center text-sm text-color_focus">
              Already have an account? <a href="login" className="text-color_button underline">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
