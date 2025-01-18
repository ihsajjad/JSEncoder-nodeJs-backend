import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import Survey from "../models/Survey.Model";

const form = `<form
  action="http://localhost:3000/api/survey/submit-survey"
  method="POST"
  target="surveyFrame"
  class="border-[2px] p-1 md:p-4 rounded-lg bg-white/20 w-full space-y-3"
>
  <h2 class="text-xl font-bold text-white">Hi, Quiz Test গুলাকে আরো উন্নত করতে আপনার মতামত দিন।</h2>

  <!-- Subject Field -->
  <div class="flex flex-col">
    <label for="subject" class="text-sm font-medium text-white">
      আপনি কোন বিভাগের শিক্ষার্থী?
    </label>
     <select
      id="subject"
      name="subject"
      class="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-purple-950/50"
      required
    >
      <option value="মানবিক">মানবিক</option>
      <option value="ব্যবসায়">ব্যবসায়</option>
      <option value="বিজ্ঞান">বিজ্ঞান</option>
    </select>
  </div>

  <!-- App Type Field -->
  <div class="flex flex-col">
    <label for="appType" class="text-sm font-medium text-white">
      ভবিষ্যতে কোন ফ্লাটফর্মে এমসিকিউ টেস্ট আনলে ভাল হবে?
    </label>
    <select
      id="appType"
      name="appType"
      class="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-purple-950/50"
      required
    >
      <option value="Website">Website</option>
      <option value="Mobile App">Mobile App</option>
    </select>
  </div>

  <!-- Opinion Field -->
  <div class="flex flex-col">
    <label for="opinion" class="text-sm font-medium text-white">
      আরো কোন কোন বিষয়ের উপর টেস্ট আনা যায়? কি কি ফিচার এখানে থাকা উচিত বলে আপনি মনে করেন? 
    </label>
    <textarea
      id="opinion"
      name="opinion"
      rows="4"
      placeholder="অথবা আমাদের এই প্রচেষ্টা সম্পর্কে আপনার মতামত কি? (বিস্তারিত লিখে জানাতে পারেন)"
      class="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-purple-950/50"
      required
    ></textarea>
  </div>

  <!-- Submit Button -->
  <div>
    <button
      type="submit"
      class="bg-green-500 mt-2 block rounded-b-md text-center font-bold p-2"
    >
      Submit Survey
    </button>
  </div>
</form>`;

export const getSurveyForm = async (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.send(form);
  } catch (error: any) {
    console.log(__filename, error.message);
    res.status(500).json("Internal server error");
  }
};

export const hscSurvey = async (req: Request, res: Response) => {
  try {
    const { subject, opinion, appType } = req.body;
    const date = new Date();

    if (!subject) {
      return res.status(400).json("Subject is required");
    }
    // Get user IP
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Get user-agent
    const userAgent = req.headers["user-agent"];

    // Parse user-agent for detailed device info
    const parser = new UAParser();
    const deviceInfo = parser.setUA(userAgent as string).getResult();

    const newSurvey = new Survey({
      date,
      subject,
      opinion,
      appType,
      deviceInfo: {
        ip: userIP,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
      },
    });

    await newSurvey.save();

    res.send({ message: "আপনার গুরুত্বপূর্ণ মতামত দেওয়ার জন্য অনেক ধন্যবাদ!" });
  } catch (error: any) {
    console.log(__filename, error.message);
    res.status(500).json("Internal server error");
  }
};

export const getSurveies = async (req: Request, res: Response) => {
  try {
    const survies = await Survey.find();
    res.json(survies);
  } catch (error: any) {
    console.log(__filename, error.message);
    res.status(500).json("Internal server error");
  }
};
