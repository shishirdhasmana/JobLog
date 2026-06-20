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
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
