import mongoose, { Schema } from "mongoose";
import { SurveyType } from "../shared/types";

const SurveySchema = new Schema<SurveyType>({
  date: { type: Date },
  subject: { type: String, },
  appType: { type: String, enum: ["Website", "Mobile App"], },
  opinion: { type: String, },
  deviceInfo: {
    ip: { type: String },
    device: { type: String },
    browser: { type: String },
    os: { type: String },
  },
});

const Survey = mongoose.model<SurveyType>("Survey", SurveySchema);

export default Survey;
