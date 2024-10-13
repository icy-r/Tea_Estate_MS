import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vacancySchema = new Schema({
  title: {
    type: String,
    required: false, 
  },
  department: {
    type: String,
    required: false, 
  },
  location: {
    type: String,
    required: false,
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"], // Enum to specify type of employment
    required: false,
  },
  description: {
    type: String,
    required: false, 
  },

});

const Vacancy = mongoose.model("Vacancy", vacancySchema);
export { Vacancy }; 
