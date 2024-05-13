# Hotel Booking System API

This project is a RESTful API for a hotel booking system built using Node.js with Express.js and TypeScript. The API manages user authentication, room management, booking operations, and more. I used JWT and browser cookie for the authorization.

## Features

- User authentication with JWT and browser cookie.
- CRUD operations for room data.
- Booking, check-in, check-out, and unbooking functionality.
- Docker containerization for easy deployment.
- API documentation using Swagger.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Mongoose
- Bcrypt
- Json Web Token
- Express Validator
- Docker
- Swagger

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js installed on your machine
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/ihsajjad/JSEncoder-nodeJs-backend.git
   cd JSEncoder-nodeJs-backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file and configure environment variables:
   ```
   MONGODB_URI=mongodb+srv://hotelAdmin:BcQpB3pYgaIYlw5w@cluster0.hbiibcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET_KEY=tyuSDf$%^gjvSDFGf$%^&*56J56$KJ
   ```

### Running the Application

1. Build and start the application:

   ```
   npm run build
   npm start
   ```

2. Access the API documentation:
   - Open your browser and go to `http://localhost:3000/docs`.

### Docker Container Setup (Optional)

1. Start your docker desktop application

2. Run Docker Compose: Run the following command in the directory where your docker-compose.yml file is located:

   ```
   docker compose up --build
   ```

   Now go to the http://localhost:3000/docs for the API endpoints documentation.

## API Endpoints

The API exposes the following endpoints:

##### User Auth

- `/auth/login`: POST request to login a user. Requires email and password in the request body.
- `/auth/register`: POST request to register a new user. Requires full name, email, and password in the request body.
- `/auth/logout`: POST request to logout a user.

##### Hotels

- `GET /hotels`: Retrieve all hotels.
- `GET /hotels/:hotelId`: Retrieve a single hotel by its ID.
- `POST /hotels/add-hotel`: Add a new hotel.
- `PUT /hotels/update/:hotelId`: Update an existing hotel by its ID.
- `DELETE /hotels/delete/:hotelId`: Delete a hotel by its ID.

##### Bookings

- `GET /bookings`: Retrieve all bookings.
- `GET /bookings/:bookingId`: Retrieve a single booking by its ID.
- `POST /bookings/create-booking`: Create a new booking.
- `PATCH /bookings/check-in/:bookingId`: Change the status of a booking to "Check-in".
- `PATCH /bookings/check-out/:bookingId`: Change the status of a booking to "Check-out".
- `PATCH /bookings/cancel/:bookingId`: Cancel a booking.

For detailed documentation, refer to the [Swagger API documentation](http://localhost:3000/docs) after running the application.

## Project Structure

- **src/**: Contains the source code of the application.
- **docker-compose.yml**: Specifies the Docker Compose configuration for containerization. This file defines the services, networks, and volumes required to run the Hotel Booking System API in Docker containers.
- **.env.example**: Example environment configuration file.
