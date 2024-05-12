/**
 * Title: Swagger Documentation Configuration
 * Description: This file sets up Swagger documentation for the Node.js Express API, providing detailed documentation of available endpoints, request parameters, and responses.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 12/5/2024
 */

import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../../package.json";
import bookingDocs from "./booking.docs";
import hotelDocs from "./hotel.docs";
import userDocs from "./user.docs";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel Booking System API Overview",
      description:
        "Authentication is not working at swagger. Because, I used browser cookie for authorization and swagger doesn't allow authentication using browser cookie.",
      version,
    },
    components: {
      securitySchemes: {
        cookieAuth: { type: "apiKey", in: "cookie", name: "auth_token" },
      },
      schemas: {
        // hotel data schema
        Hotel: {
          type: "object",
          properties: {
            hotelName: { type: "string" },
            description: { type: "string" },
            pricePerNight: { type: "number" },
            address: { type: "string" },
            starRating: { type: "number" },
            facilities: { type: "array", items: { type: "string" } },
            images: { type: "array", items: { type: "string" } },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        // user data schema
        User: {
          type: "object",
          properties: {
            fullName: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "Email address of the user",
              example: "john@example.com",
            },
            password: {
              type: "string",
              description: "Password of the user",
              example: "myStrongPassword",
            },
          },
          required: ["fullName", "email", "password"],
          errorMessage: {
            properties: {
              fullName: "Full Name is required",
              email: "Email is required",
              password: "Password is required",
            },
          },
        },
        // booking data schema
        Booking: {
          type: "object",
          properties: {
            hotelId: {
              type: "string",
              description: "The ID of the hotel",
              example: "663e3162a7f1f639a8d596d3",
            },
            userId: {
              type: "string",
              description: "The ID of the user",
              example: "663df9cfee7a563f2c1e6802",
            },
            checkInDate: {
              type: "string",
              format: "date-time",
              description: "The check-in date",
              example: "2024-05-15",
            },
            checkOutDate: {
              type: "string",
              format: "date-time",
              description: "The check-out date",
              example: "2024-05-15",
            },
            numberOfNights: {
              type: "integer",
              description: "The number of nights for the booking",
              example: 2,
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description:
                "The date and time when the booking was last updated",
              example: "2022-05-17T08:00:00Z",
            },
            status: {
              type: "string",
              enum: ["Checked-In", "Checked-Out", "Canceled", "Pending"],
              default: "Pending",
              description: "The status of the booking",
            },
          },
          required: [
            "hotelId",
            "userId",
            "checkInDate",
            "checkOutDate",
            "numberOfNights",
          ],
        },
      },
    },
    security: [{ cookieAuth: [] }],
    paths: {
      ...userDocs,
      ...hotelDocs,
      ...bookingDocs,
    },
  },
  apis: ["../routes/*.ts", "../models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger UI page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
