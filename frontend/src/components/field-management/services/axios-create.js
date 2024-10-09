import axios from "../../../services/axios";

const createField = async (data, notify) => {
  console.log(data);
  try {
    const response = await axios.post("/fields", data);
    // If response is successful
    if (response.status === 200) {
      notify("Field added successfully", "success");
      // Reset the form
      return true;
    }
  } catch (error) {
    notify(
      "Error adding field: " + (error.response?.data?.message || error.message),
      "error"
    );
    return false;
  }
};

export default createField;
