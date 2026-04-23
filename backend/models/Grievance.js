import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Transport", "Other"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  }
});

export default mongoose.model("Grievance", grievanceSchema);