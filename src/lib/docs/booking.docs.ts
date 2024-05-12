/**
 * Title: Bookings Documentation
 * Description: This file contains documentation for hotel bookings, including explanations of available endpoints, request parameters, and response formats.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 12/5/2024
 */

export default {
  "/api/bookings": {
    get: {
      summary: "Get all bookings",
      description: "Retrieve information about all bookings.",
      responses: {
        "200": {
          description: "Bookings found",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Booking",
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Bookings"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/bookings/{bookingId}": {
    get: {
      summary: "Get a single booking",
      description:
        "Retrieve information about a single booking based on its ID.",
      parameters: [
        {
          in: "path",
          name: "bookingId",
          required: true,
          description: "The ID of the booking to retrieve",
          schema: {
            type: "string",
            example: "663e56bec7a2c15fabea1a84",
          },
        },
      ],
      responses: {
        "200": {
          description: "Booking found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Booking",
              },
            },
          },
        },
        "404": {
          description: "Booking doesn't exist",
        },
        "400": { description: "Invalid booking Id" },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Bookings"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/bookings/create-booking": {
    post: {
      summary: "Create a new booking",
      description:
        "Create a new booking entry in the system. The hotelId have to stay in database and be a valid mongodb objectId",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Booking",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Booking created successfully",
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
          description: "Bad request. Invalid booking data provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Bookings"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/bookings/check-in/{bookingId}": {
    patch: {
      summary: "Update status to Check-in",
      description:
        "Update booking status to 'Check-In' by the BookingId. The booking have to stay in database.",
      parameters: [
        {
          in: "path",
          name: "bookingId",
          description:
            "BookingId should be a valid mongooDB ObjectId. To get valid BookingId request for all bookings and copy one valid Id.",
        },
      ],
      responses: {
        "200": {
          description: "Booking was updated successfully",
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
          description: "Bad request. Invalid booking id provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Bookings"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/bookings/check-out/{bookingId}": {
    patch: {
      summary: "Update status to Check-out",
      description:
        "Update booking status to 'Check-out' by the BookingId. The booking have to stay in database.",
      parameters: [
        {
          in: "path",
          name: "bookingId",
          description:
            "BookingId should be a valid mongooDB ObjectId. To get valid BookingId request for all bookings and copy one valid Id.",
        },
      ],
      responses: {
        "200": {
          description: "Status was updated successfully",
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
          description: "Bad request. Invalid booking id provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Bookings"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/bookings/cancel/{bookingId}": {
    patch: {
      summary: "Update status to Canceled",
      description:
        "Update booking status to 'Canceled' by the BookingId. The booking have to stay in database.",
      parameters: [
        {
          in: "path",
          name: "bookingId",
          description:
            "BookingId should be a valid mongooDB ObjectId. To get valid BookingId request for all bookings and copy one valid Id.",
        },
      ],
      responses: {
        "200": {
          description: "Status was updated successfully",
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
          description: "Bad request. Invalid booking id provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["Bookings"],
      security: [{ cookieAuth: [] }],
    },
  },
};
