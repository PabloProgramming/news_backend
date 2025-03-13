# 📰 NC News Backend 

## Project Overview

NC News is a RESTful API that provides access to news articles, comments, users, and topics. It allows users to retrieve, filter, and interact with articles and comments. The project is built using **Node.js**, **Express.js**, and **PostgreSQL**.

### 🔗 Hosted Version

You can access the hosted version of the API here:  
👉 **[NC News API](https://news-backend-vtec.onrender.com/api)**

---

## 🛠 Prerequisites

Before setting up and running this project, ensure you have the following installed:

- **Node.js** (Minimum version: v18.0.0)
- **PostgreSQL** (Minimum version: v12.0)
- **Git**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository  

First, clone the repository to your local machine and navigate into the project directory:

git clone <https://github.com/PabloProgramming/news_backend>  
cd news_BE

### 2️⃣ Install Dependencies  

Install all necessary dependencies:

`npm install`


### 3️⃣ Set Up the Databases  

Before running the project, you need to set up the PostgreSQL databases.

#### **Creating the Databases**  
Run the following command to create both the development and test databases:

    npm run setup-dbs

### 4️⃣ Environment Configuration  

You must create two **.env** files in the root directory of the project:

📄 **`.env.development`**  

    PGDATABASE=nc_news

📄 **`.env.test`**  

    PGDATABASE=nc_news_test

🚨 **Make sure** your `.gitignore` includes:  

    .env.*

This prevents sensitive credentials from being uploaded to GitHub.


### 5️⃣ Seed the Database  

After setting up the database, seed both the dev-db and the test-db:

    npm run seed-test
    
    npm run seed-dev

This command populates the database with sample articles, users, topics, and comments.

---

### 6. Running Tests

To ensure everything is set up correctly, run the test suite:

    npm test

If everything is correct, all tests should pass successfully.

---

## 🚀 Running the Server

Start the development server with:

    npm start

By default, the server will run on **port 9090**. You should see an output like:

Listening on port 9090...

You can then access the API at:

http://localhost:9090/api

---

## 📌 API Endpoints

For a list of available endpoints and how to interact with the API, check out:

👉 **[API Documentation](https://news-backend-vtec.onrender.com/api))**

---

## ❓ Troubleshooting

### 🔹 Error: `PGDATABASE or DATABASE_URL not set`
If you see this error when running the project, make sure:
- You have created the `.env` files (`.env.development` and `.env.test`).
- You have run `npm run setup-dbs` to create the databases.

### 🔹 Database Connection Issues
- Ensure PostgreSQL is running on your machine.
- Check that the database names in your `.env` files match the actual databases created.

---

## 💡 Additional Notes
- If deploying this project to a hosting service (e.g., Heroku, Render), set the `DATABASE_URL` environment variable accordingly.
- The `NODE_ENV` variable is automatically set to `test` when running `npm test`.

---

## 🤝 Contributing  
If you'd like to contribute:  
1️⃣ Fork the repository 🍴  
2️⃣ Create a new branch 🛠️  
3️⃣ Make your changes and commit them ✅  
4️⃣ Submit a pull request 📩  

Let's build something great together! 🚀✨  

---

### 🎯 Minimum Requirements  
✅ **Node.js**: v16+  
✅ **PostgreSQL**: v12+  

---

## 📜 License
This project is licensed under the **MIT License**.

---

💡 **Need Help?** Feel free to reach out or create an issue on GitHub! 😊  
Happy coding! 🚀👨‍💻