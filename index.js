require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 8000;
const videoRoutes = require("./routes/videos");
const cors = require("cors");

console.log("THIS IS DOTENV", process.env)

app.use(cors());

app.use(express.json());

app.use("/images", express.static("./public/images"));

app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
});

app.use("/", videoRoutes)

