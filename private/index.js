const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/api/user.js");
const sessionRouter = require("./routes/api/session.js");

let database;

try {
    database = require("../configuration/keys.js");
}
catch(error) {

}

const server = express();
const port = process.env.PORT || 5000;
const key = process.env.DATABASE_KEY || database.mongoURI;

mongoose.connect(key, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Database connected...")).catch((err) => console.log(err));

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use("/api", userRouter);
server.use("/api", sessionRouter);
server.use(express.static(path.join(__dirname, "../build")));

if(process.env.NODE_ENV === "production") { 
    server.get("*", (request, result) => { 
        result.sendFile(path.join(__dirname + "../build/index.html"));
    });
}
else {
    server.get("*", (request, result) => { 
        result.sendFile(path.join(__dirname + "../public/index.html"));
    });
}

server.listen(port, () => console.log(`Server now running on port ${port}...`));
