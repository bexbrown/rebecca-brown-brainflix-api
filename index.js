const express = require("express");
const app = express();
const PORT = 8080;
const videoRoutes = require("./routes/videos");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
});

app.use("/", videoRoutes)

