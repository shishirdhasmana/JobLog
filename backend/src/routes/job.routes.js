import express from "express";
import Job from "../models/Job.js";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

//Create Job
//http://localhost:3000/api/job/create
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
//http://localhost:3000/api/job/alljobs
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
//http://localhost:3000/api/job/changeStatus
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

//Delete JOB
//http://localhost:3000/api/job/delete/:id
router.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await Job.deleteOne({ _id: id, userId: req.user._id });
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log("Unable to delete Job", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Web Scrapper for automatic form filling
//http://localhost:3000/api/job/autoFill
router.post("/autoFill", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(404).json({
      success: false,
      message: "Enter URL",
    });
  }
  try {
    const data = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000,
    });
    const $ = cheerio.load(data.data);
    $("script, style, nav, footer, header").remove();
    const rawText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 4000);

    const prompt = `Extract job details from the text below.
        Return ONLY a valid JSON object, no explanation, no markdown:
        {
          "title": "job title or null",
          "company": "company name or null",
          "location": "location or null",
          "salary": "salary or null"
        }

        Text: ${rawText}
      `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const jobDetails = JSON.parse(response.text.trim());
    res.status(201).json({
      success: true,
      job: jobDetails,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
