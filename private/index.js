const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const database = require("../configuration/keys.js");
const userRouter = require("./routes/api/user.js");
const sessionRouter = require("./routes/api/session.js");

const server = express();
const port = process.env.PORT || 5000;

mongoose.connect(database.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Database connected...")).catch((err) => console.log(err));

server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use(cors());
server.use("/api", userRouter);
server.use("/api", sessionRouter);

server.listen(port, () => console.log(`Server now running on port ${port}...`));
