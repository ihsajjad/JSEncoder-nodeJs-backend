import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Hotel Booking System API Overview", version },
    components: {
      securitySchemes: {
        cookieAuth: { type: "apiKey", in: "cookie", name: "auth_token" },
      },
    },
    security: [{ cookieAuth: [] }],
    paths: {
      "/api/hotels": {
        get: {
          summary: "Get all hotels",
          description: "Retrieve a list of all hotels.",
          responses: {
            "200": {
              description: "A list of hotels",
            },
          },
        },
      },
    },
    // tags: [
    //   {
    //     name: "Hotels",
    //     description: "Endpoints related to hotel management",
    //   },
    // ],
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
