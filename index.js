require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const videoRoutes = require("./routes/videos");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/images", express.static("./public/images"));

app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
});

app.use("/", videoRoutes);

