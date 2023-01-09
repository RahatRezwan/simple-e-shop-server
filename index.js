const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

/* Middleware */
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("e-shop is server is running");
});

/* Connect mongodb */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@e-shop.nmlrimc.mongodb.net/?retryWrites=true&w=majority`;
/* Create client */
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverApi: ServerApiVersion.v1,
});

const run = async () => {
   try {
      const shop_db = client.db("e-shop-database");
      const usersCollection = shop_db.collection("users");
      const productsCollection = shop_db.collection("products");
      const cartsCollection = shop_db.collection("carts");

      /* Route a store a new user data */
      app.post("/users", async (req, res) => {
         const user = req.body;
         const result = await usersCollection.insertOne(user);
         res.send(result);
      });

      /* Get all users */
      app.get("/users", async (req, res) => {
         const query = {};
         const users = await usersCollection.find(query).toArray();
         res.send(users);
      });

      /* delete a user */
      app.delete("/users", async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const result = await usersCollection.deleteOne(query);
         res.send(result);
      });

      /* Store a single product */
      app.post("/products", async (req, res) => {
         const product = req.body;
         const result = await productsCollection.insertOne(product);
         res.send(result);
      });
      /* Store a single product */
      app.post("/carts", async (req, res) => {
         const product = req.body;
         const result = await cartsCollection.insertOne(product);
         res.send(result);
      });

      /* Get all products */
      app.get("/products", async (req, res) => {
         const query = {};
         const products = await productsCollection.find(query).toArray();
         res.send(products);
      });
   } finally {
   }
};
run().catch((err) => console.error(err));

app.listen(port, () => {
   console.log(`server is running on port : ${port}`);
});
