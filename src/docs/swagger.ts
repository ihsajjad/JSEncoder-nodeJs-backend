import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import hotelDocs from "./hotel.docs";
import userDocs from "./user.docs";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Hotel Booking System API Overview", version },
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
      },
    },
    security: [{ cookieAuth: [] }],
    paths: {
      ...hotelDocs,
      ...userDocs,
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
