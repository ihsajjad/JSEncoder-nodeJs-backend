import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import Survey from "../models/Survey.Model";

const form = `<form
  action="/api/survey/submit-survey"
  method="POST"
  class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
>
  <h2 class="text-xl font-bold text-gray-800">Survey Form</h2>

  <!-- Subject Field -->
  <div class="flex flex-col">
    <label for="subject" class="text-sm font-medium text-gray-700">
      Subject
    </label>
    <input
      type="text"
      id="subject"
      name="subject"
      placeholder="Enter subject"
      class="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      required
    />
  </div>

  <!-- App Type Field -->
  <div class="flex flex-col">
    <label for="appType" class="text-sm font-medium text-gray-700">
      App Type
    </label>
    <select
      id="appType"
      name="appType"
      class="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      required
    >
      <option value="Website">Website</option>
      <option value="Mobile App">Mobile App</option>
    </select>
  </div>

  <!-- Opinion Field -->
  <div class="flex flex-col">
    <label for="opinion" class="text-sm font-medium text-gray-700">
      Your Opinion
    </label>
    <textarea
      id="opinion"
      name="opinion"
      rows="4"
      placeholder="Share your thoughts..."
      class="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      required
    ></textarea>
  </div>

  <!-- Submit Button -->
  <div>
    <button
      type="submit"
      class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200"
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

export const hscSurvey = async (
  req: Request,
  res: Response
) => {
  try {
    const { subject, opinion } = req.body;

    if (!subject) {
      res.status(400).json({ message: "Subject is required" });
    }

    // Get user IP
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Get user-agent
    const userAgent = req.headers["user-agent"];

    // Parse user-agent for detailed device info
    const parser = new UAParser();
    const deviceInfo = parser.setUA(userAgent as string).getResult();

    const newSurvey = new Survey({
      subject,
      opinion,
      deviceInfo: {
        ip: userIP,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
      },
    });

    await newSurvey.save();

    res.json({ message: "Thanks for taking the survey!" });
  } catch (error: any) {
    console.log(__filename, error.message);
    res.status(500).json("Internal server error");
  }
};
