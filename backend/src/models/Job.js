import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Ghosted", "Accepted"],
    default:"Applied"
  },
  url: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
},{timestamps:true});

const Job = mongoose.model("Job", jobSchema);

export default Job;
