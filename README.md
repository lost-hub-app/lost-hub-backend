# LostHub Server

**Authors**:  Adnan Mohamud, Ekaterina Khoroshilova, David Danilchik, Chester Lee Coloma

## Overview

The LostHub server is an essential component of the LostHub application, designed to efficiently manage the reporting and tracking of lost and found items. With an aim to streamline the process of reconnecting people with their lost belongings, LostHub offers a user-friendly and comprehensive platform for users to report lost items, discover found items, and communicate with finders. This project is not just a technical solution but also a community service initiative to reduce the stress and impact of losing personal items.

## Getting Started

To get the LostHub server up and running on your machine, follow these instructions:

1. Clone the repository to your local machine.
2. Navigate to the project directory via the command line.
3. Install the required dependencies with the command: `npm install`.
4. Set up a MongoDB database and acquire the connection URI.
5. Rename the `.env.sample` file to `.env` and include your MongoDB connection URI.
6. Launch the Express server using the command: `npm start`.
7. Open your web browser and go to the provided URL (typically `http://localhost:3000`).

## Architecture

LostHub is structured using the MERN stack:

- **Back-end**: Managed by an Express server, which handles HTTP requests and communicates with the MongoDB database.
- **Database**: Utilizes MongoDB to keep track of items, including descriptions, locations, categories, and statuses (lost or found).
