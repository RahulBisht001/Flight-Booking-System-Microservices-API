const express = require("express");

const apiRoutes = require("./routes");
const {ServerConfig, Logger} = require("./config");

const app = express();

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
    res.send("learning microservices architecture");
});

app.listen(ServerConfig.PORT, () => {
    console.log(`server is running on http://localhost:${ServerConfig.PORT}`);
});
