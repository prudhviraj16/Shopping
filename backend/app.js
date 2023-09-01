const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const mongoURI = `mongodb+srv://Prudhvi876:Prudhvi876@cluster0.66ack1u.mongodb.net/test`;
const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

mongoose
  .connect(mongoURI)
  .then((res) => {
    console.log("Connected to db successfully");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

app.use(express.json({ extended: true }));
app.use(
  express.urlencoded({ extended: true, parameterLimit: 50000 })
);

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

app.listen(3100);
