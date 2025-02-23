# Tanstack Starter with JWT Authentication

This project demonstrates how to integrate Tanstack Start with an external API using JWT (JSON Web Tokens) as the primary form of authentication.

The repository is divided into two main directories:

-   **server**: A NestJS-based backend that uses MongoDB as its database. MongoDB is run inside a Docker container.
-   **client**: Tanstack Start with Tanstack Query.

## Setup

Before running the project, install the dependencies in both the `server` and `client` directories. Open a terminal in each directory and execute:

`pnpm install`

### Server

1. **Docker Setup**  
   Ensure that Docker is running on your machine. The server relies on a Docker container for MongoDB.

2. **Running the Server**  
   Navigate to the `server` directory in your terminal and run: `pnpm run dev`

## API Endpoints

Here is a summary of the available API endpoints:

-   **Login**  
    **POST** `http://localhost:7588/authentication/login`  
    Authenticates the user, returns access and refresh tokens, and stores a hashed version of the refresh token in the database.

-   **Logout**  
    **POST** `http://localhost:7588/authentication/logout`  
    Logs out the user by removing the refresh token from the database. (Requires an access token in the `Authorization` header as a bearer token.)

-   **Register**  
    **POST** `http://localhost:7588/authentication/register`  
    Registers a new user, returns access and refresh tokens, and stores a hashed version of the refresh token in the database.

-   **Refresh Token**  
    **POST** `http://localhost:7588/authentication/refresh`  
    Generates new JWT tokens for the user. (Requires the refresh token to be provided as a bearer token in the `Authorization` header.)

## Client

To run the frontend simply run `pnpm run dev` inside the client folder.

When the project loads you will see the home page with two links (login and dashboard). Clicking the dashboard should redirect you to the login page. **IF YOU HAVE NOT REGISTERED A USER LOGIN WILL FAIL** if it is your first time running the project make sure you go to the registration page first and click the link. This should create a user and log you in automatically.
