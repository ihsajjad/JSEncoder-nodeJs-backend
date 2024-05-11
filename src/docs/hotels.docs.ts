export default {
  "/api/hotels": {
    get: {
      summary: "Get all hotels",
      description: "Retrieve a list of all hotels.",
      responses: {
        "200": {
          description: "A list of hotels",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Hotel",
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Hotels"],
    },
  },
  "/api/hotels/{hotelId}": {
    get: {
      summary: "Get Single Hotel",
      parameters: [
        {
          in: "path",
          name: "hotelId",
          description:
            "Hotel Id should be a valid mongooDB ObjectId. Some valid hotel Ids '663fd5f1f7a27252cabf3221', '663fd620f7a27252cabf3223', and '663fd63ef7a27252cabf3225'. Note : put the id without the single quote.",
        },
      ],
      description: "Get single hotel by the hotel id. ",
      responses: {
        "200": {
          description: "A single hotel",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Hotel",
              },
            },
          },
        },
        "404": {
          description: "Hotel was not found.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
                required: ["message"],
              },
            },
          },
        },
        "400": {
          description: "Invalid hotel Id",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Hotels"],
    },
  },
  "/api/hotels/add-hotel": {
    post: {
      summary: "Create a new hotel",
      description:
        "Create a new hotel entry in the system using the provided hotel data.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Hotel",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Hotel created successfully",
        },
        "400": {
          description: "Bad request. Invalid hotel data provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Hotels"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/hotels/update/{hotelId}": {
    put: {
      parameters: [
        {
          in: "path",
          name: "hotelId",
          description:
            "Hotel Id should be a valid mongooDB ObjectId. Some valid hotel Ids '663fd5f1f7a27252cabf3221', '663fd620f7a27252cabf3223', and '663fd63ef7a27252cabf3225'. Note : put the id without the single quote.",
        },
      ],
      summary: "Update a hotel",
      description: "Update a hotel by hotel Id.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Hotel",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Hotel was upated successfully",
        },
        "400": {
          description: "Bad request. Invalid hotel data provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Hotels"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/hotels/delete/{hotelId}": {
    delete: {
      parameters: [
        {
          in: "path",
          name: "hotelId",
          description:
            "Hotel Id should be a valid mongooDB ObjectId. To get valid hotelId request for all hotels and copy one valid Id.",
        },
      ],
      summary: "Delete a hotel",
      description: "Delete a hotel by hotel Id.",

      responses: {
        "200": {
          description: "Hotel was deleted successfully",
        },
        "404": {
          description: "Hotel doesn't exist",
        },
        "400": {
          description: "Bad request. Invalid hotel data provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Hotels"],
      security: [{ cookieAuth: [] }],
    },
  },
};
