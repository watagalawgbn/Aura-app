// src/gridfs.js

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

let gfs; // GridFS instance

// Connect to MongoDB and set up GridFS
const connectGridFs = (mongoURI) => {
  const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // When connection is ready, initialize GridFS
  conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("audios"); // use "audios" bucket
    console.log("GridFS connected successfully");
  });

  return conn;
};

// Return GridFS instance
const getGfs = () => gfs;

module.exports = { connectGridFs, getGfs };
