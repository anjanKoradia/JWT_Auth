require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const PORT = process.env.PORT || 3000;

/* ---------------------------------------- 
  Assets
---------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ---------------------------------------- 
  Routes
---------------------------------------- */
require("./routes/web")(app);

/* ---------------------------------------- 
  Start server
---------------------------------------- */
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});