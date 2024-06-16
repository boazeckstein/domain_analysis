# Domain Analysis Service

This project provides a service to analyze domain information using VirusTotal and Whois data. It stores the analysis results in a SQLite database and provides an API to add domains and retrieve their analysis information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
    - [Add a Domain](#add-a-domain)
    - [Get Domain Information](#Get-Domain-Information)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:boazeckstein/domain_analysis.git
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Ensure you have SQLite installed on your machine.

## Usage

1. Start the server:
    ```sh
    node index.js
    ```

2. The server will start on `http://localhost:3000`.

3. The server will automatically run the domain analysis when it starts and every 60 minutes thereafter.

## API Endpoints

### Add a Domain

- **URL:** `/add_domain`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "domain": "example.com"
    }
    ```
- **Response:**
    - `200 OK` if the domain is added successfully.
    - `400 Bad Request` if the domain is not provided.
    - `500 Internal Server Error` if there is an error adding the domain.

### Get Domain Information

- **URL:** `/domain`
- **Method:** `GET`
- **Query Parameters:**
    - `domain` - The domain name to retrieve information for.
- **Response:**
    - `200 OK` with the VirusTotal and Whois information.
    - `400 Bad Request` if the domain is not provided.
    - `404 Not Found` if the domain is not found.
    - `500 Internal Server Error` if there is an error retrieving the information.

## Project Structure

- `index.js`: Entry point of the application. Sets up the Express server and routes.
- `database/database.js`: Handles SQLite database operations.
- `analysis/analysis.js`: Contains the logic to update domain information using VirusTotal and Whois data.
- `analysis/virusTotal.js`: Fetches VirusTotal data for a domain.
- `analysis/whois.js`: Fetches Whois data for a domain.

## Author

This project was created by Boaz Eckstein. You can reach out to me at boazecks@gmail.com.

## To Do

- Add a logger for better debugging and monitoring.
- Parse Whois output to ensure it is a valid JSON object for easier data handling.
- Integrate additional services like VirusTotal and Whois for more comprehensive domain analysis.
