import express from "express";
import Job from "../models/Job.js";
const router = express.Router();

//Create Job
router.post("/create", async (req, res) => {
  const job = new Job({ ...req.body, userId: req.user._id });
  try {
    await job.save();
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error Creating Job: ", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Read All Jobs listed by user
router.get("/alljobs", async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user._id }).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Error Occured while finding Job");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//Update Status of Job
router.put("/changeStatus", async (req, res) => {
  try {
    await Job.updateOne(
      { _id: req.body.id, userId: req.user._id },
      { $set: { status: req.body.status } },
    );
    res.status(200).json({
      success: true,
      message: "Update Successful",
    });
  } catch (error) {
    console.log("Error Occured while Updating User", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
//Web Scrapper for automatic form filling




//Delete JOB
router.delete('/delete/:id',async(req,res)=>{
  let id = req.params.id;
  try {
   await Job.deleteOne({_id:id,userId:req.user._id})
   res.status(200).json({
    success:true,
    message:"Job deleted successfully"
   }) 
  } catch (error) {
    console.log("Unable to delete Job",error);
    res.status(400).json({
      success:false,
      message:error.message,
    })
  }
})


export default router;
