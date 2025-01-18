/**
 * Title: Survey Routes
 * Description: This file defines routes related to hotel management, including CRUD operations for hotels and related functionalities.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 12/1/2025
 */

import express from "express";
import {
    getSurveies,
    getSurveyForm,
    hscSurvey,
} from "../controllers/survey.controller";

const router = express.Router();

router.get("/", getSurveies);
// get all hotels
router.get("/hsc", getSurveyForm);

// get single hotel by Id
router.post("/submit-survey", hscSurvey);

export default router;
