// const express = require("express");
// const dotenv = require("dotenv");
// const { MongoClient } = require("mongodb");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB Connection
// const mongoURI = process.env.MONGO_URI; // Load MONGO_URI from .env
// const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

// const dbName = "safepass"; // Database Name
// let db;

// // Connect to MongoDB
// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB successfully!");
//     db = client.db(dbName); // Assign the database instance
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//     process.exit(1); // Exit the application if the connection fails
//   }
// }

// // Routes
// app.get("/", async (req, res) => {
//   try {
//     const collection = db.collection("passwords");
//     const findResult = await collection.find({}).toArray();
//     res.json({ success: true, data: findResult });
//   } catch (err) {
//     console.error("Error fetching data", err);
//     res.status(500).json({ success: false, message: "Failed to fetch data" });
//   }
// });

// app.post("/", async (req, res) => {
//   try {
//     const password = req.body;
//     const collection = db.collection("passwords");
//     const insertResult = await collection.insertOne(password);
//     res.json({ success: true, result: insertResult });
//   } catch (err) {
//     console.error("Error inserting data", err);
//     res.status(500).json({ success: false, message: "Failed to insert data" });
//   }
// });

// app.delete("/", async (req, res) => {
//   try {
//     const password = req.body;
//     const collection = db.collection("passwords");
//     const deleteResult = await collection.deleteOne(password);
//     res.json({ success: true, result: deleteResult });
//   } catch (err) {
//     console.error("Error deleting data", err);
//     res.status(500).json({ success: false, message: "Failed to delete data" });
//   }
// });

// // Start the Server
// app.listen(port, async () => {
//   await connectToDatabase(); // Connect to MongoDB before starting the server
//   console.log(`Server is running at http://localhost:${port}`);
// });

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // MongoDB URI
const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

const dbName = "safepass"; // Database Name
let db;

// Connect to MongoDB
async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      console.log("Connected to MongoDB successfully!");
      db = client.db(dbName); // Assign the database instance
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      throw err; // Throw the error so it can be handled by Vercel
    }
  }
}

// Handler function
module.exports = async (req, res) => {
  try {
    // Ensure the database connection
    await connectToDatabase();

    const collection = db.collection("passwords");

    if (req.method === "GET") {
      // Fetch all data
      const findResult = await collection.find({}).toArray();
      return res.status(200).json({ success: true, data: findResult });
    } else if (req.method === "POST") {
      // Insert data
      const password = req.body;
      const insertResult = await collection.insertOne(password);
      return res.status(200).json({ success: true, result: insertResult });
    } else if (req.method === "DELETE") {
      // Delete data
      const password = req.body;
      const deleteResult = await collection.deleteOne(password);
      return res.status(200).json({ success: true, result: deleteResult });
    } else {
      // Handle unsupported methods
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
    }
  } catch (err) {
    console.error("Error processing request", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
