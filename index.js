const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
   console.log(`server is running on port : ${port}`);
});
