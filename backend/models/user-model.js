import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyPhone: { type: String, required: true },
  companyEmail: { type: String },
  companyWebsite: { type: String },
  companyLogo: { type: String },
  companyDescription: { type: String },
  companyContactPerson: { type: String },
  companyContactPersonEmail: { type: String },
  companyContactPersonPhone: { type: String },
});

const User = model("User", userSchema);

export { User };
