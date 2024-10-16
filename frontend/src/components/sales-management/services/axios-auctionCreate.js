import axios from "../../../services/axios";

const createAuction = (data, setValue) => {
  console.log(data);
  axios.post('/auctions', data)
    .then((response) => {
      // If response is successful
      if (response.status === 200) {
        alert('Auction created successfully');
        // Reset the form
        setValue({
          auctionID: '',
          startDate: '',
          endDate: '',
          productID: '',
          buyerIDs: [],
          status: ''
        });
      }
    })
    .catch((error) => {
      alert("Failed to create auction: " + error.message);
    });
}

export default createAuction;
