import React, { useEffect, useState } from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import golden from '@assets/product/GOLDEN.jpg';
import axios from '../../../services/axios.js';
import op from '@assets/product/OP.jpg';
import profile from '@assets/product/profile.jpg';
import Footer from "../../footer/Footer.jsx";
const Profile = (buyerId) => {
  const navigate = useNavigate();
  
  // State for buyer data and dialog visibility
  const [buyerData, setBuyerData] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // To handle dialog open/close
  const [editData, setEditData] = useState({
    fName: '',
    lName: '',
    email: '',
    position: '',
    company: '',
    companyAddress: '',
    telephone: '',

  });

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const buyerResponse = await axios.get(`/buyers/${buyerId.buyerId}`);
        if (buyerResponse.data) {
          setBuyerData(buyerResponse.data);
          setEditData(buyerResponse.data); // Set initial form values
        } else {
          console.error('No data found');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBuyerData();
  }, [buyerId]);

  // Handle dialog open/close
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  // Handle input changes in the dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle form submission (Update buyer data)
  const handleSubmit = async () => {
    try {
      await axios.put(`/buyers/${buyerId.buyerId}`, editData);
      setBuyerData(editData); // Update the state with edited data
      setOpenDialog(false); // Close the dialog
    } catch (err) {
      console.error("Error updating buyer data", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-500 h-20"></div>

      {/* Profile Section */}
      <div className="bg-white p-4 shadow-md mx-auto mt-[-40px] rounded-lg flex flex-col items-center justify-center w-2/4">
        <Avatar
          src={profile}
          alt="Profile Picture"
          sx={{ width: 200, height: 200 }}
        />
        <h2 className="mt-2 text-xl font-semibold">{buyerData.fName} {buyerData.lName}</h2>
        <p className="text-gray-500">{buyerData.email}</p>
        <Button
          variant="contained"
          sx={{ marginTop: '16px', backgroundColor: '#e0e0e0', color: '#000' }}
          onClick={handleClickOpen} // Open dialog on click
        >
          Edit Profile
        </Button>
      </div>

      

      {/* Product Details Section */}
      <div className="grid grid-cols-3 gap-4 mt-8 mx-8 my-8">
        <div className="bg-black-200 p-1 rounded-lg flex flex-col items-center ">
          <img src={op} alt="Icon" className="w-50 h-50" />
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
          <div className="justify-center">
            
            <p className="text-center text-l text-gray-600">
            A tea estate is a sprawling area of land dedicated to the cultivation, processing, and production of tea, 
            often located in hilly or mountainous regions with ideal climates.
             These estates are typically surrounded by lush greenery, 
            where rows of tea bushes stretch across the landscape. 
            From hand-picking the tea leaves to processing them in on-site factories, 
            tea estates play a crucial role in producing various types of tea, 
            such as black, green, and white tea
            </p>
          </div>
        </div>
        <div className="bg-black-200 p-1 rounded-lg flex flex-col items-center">
          <img src={golden} alt="Icon" className="w-50 h-50" />
        </div>
      </div>

      {/* Dialog for Editing Profile */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
  <TextField
    margin="dense"
    name="fName"
    label="First Name"
    type="text"
    fullWidth
    value={editData.fName}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="lName"
    label="Last Name"
    type="text"
    fullWidth
    value={editData.lName}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="position"
    label="Position"
    type="text"
    fullWidth
    value={editData.position}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="company"
    label="Company"
    type="text"
    fullWidth
    value={editData.company}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="companyAddress"
    label="Company Address"
    type="text"
    fullWidth
    value={editData.companyAddress}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="telephone"
    label="Telephone"
    type="text"
    fullWidth
    value={editData.telephone}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="email"
    label="Email"
    type="email"
    fullWidth
    value={editData.email}
    onChange={handleInputChange}
  />
  
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>

    
  );
};

export default Profile;
