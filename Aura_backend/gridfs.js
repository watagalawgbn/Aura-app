//src/gridfs.js

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

let gfs;

const connectGridFs = (mongoURI) => {
  const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("audios");
    console.log("GridFS connected successfully");
  });
  return conn;
};

const getGfs = () => gfs;

module.exports = { connectGridFs, getGfs };
