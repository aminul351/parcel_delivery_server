// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvzk3hq.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// Test route
app.get("/", (req, res) => {
  res.send("Parcel Delivery Server is running!");
});




// GET all parcels
    app.get("/parcels", async (req, res) => {
      try {
        const parcels = await parcelsCollection.find({}).toArray();
        res.status(200).json(parcels);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch parcels", error });
      }
    });

    // GET a single parcel by ID
    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const parcel = await parcelsCollection.findOne({ _id: new ObjectId(id) });
        if (!parcel) return res.status(404).json({ message: "Parcel not found" });
        res.status(200).json(parcel);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch parcel", error });
      }
    });

    // POST a new parcel
    app.post("/parcels", async (req, res) => {
      const newParcel = req.body; // { senderName, receiverName, senderAddress, receiverAddress, status }
      try {
        const result = await parcelsCollection.insertOne(newParcel);
        res.status(201).json({ message: "Parcel added successfully", id: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: "Failed to add parcel", error });
      }
    });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
