# Project Setup and Usage Instructions

## Prerequisites

Before setting up and running this project, ensure you have the following installed:

- Node.js and npm
- PostgreSQL
- Git

## 1. Clone the Repository

Clone the project repository to your local machine and navigate into the project directory:

git clone <repository-url> cd <repository-name>

## 2. Set Up Databases

Run the following command to set up the databases:

npm run setup-dbs

## 3. Environment Configuration

Ensure you have the following environment configuration files set up in your project directory:

- `.env.test`
- `.env.development`

These files should contain the necessary database connection variables:

### .env.dev file

PGDATABASE = "nc_news"

### .env.test file

PGDATABASE = "nc_news_test"

## 4. Secure Your Credentials

Ensure that your `.gitignore` file includes the following to keep sensitive credentials secure:

.env.*

## 5. Install Dependencies

Install the project dependencies by running:

npm install