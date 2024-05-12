/**
 * Title: User Documentation
 * Description: This file contains comprehensive documentation for user management, covering endpoints, request parameters, and response formats related to user authentication, registration, and profile management.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 12/5/2024
 */

export default {
  "/api/auth/register": {
    post: {
      summary: "Create an user account.",
      description:
        "Create an user account with these data: fullName, email, and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User was created successfully",
        },
        "400": {
          description: "Bad request. Invalid user data provided.",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["User"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/auth/login": {
    post: {
      summary: "Login account",
      description:
        "Login your account with the valid email and password. These are the admin credentials: email: 'admin@gmail.com', password: 'pas'",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
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
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User login successfull",
        },
        "400": {
          description: "Bad request. Invalid user credentials",
        },
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["User"],
      security: [{ cookieAuth: [] }],
    },
  },
  "/api/auth/logout": {
    post: {
      summary: "Logout user",
      description: "Logout user account",
      responses: {
        "200": {
          description: "User logout successful",
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
        "500": {
          description: "Internal server error",
        },
      },
      tags: ["User"],
      security: [{ cookieAuth: [] }],
    },
  },
};
