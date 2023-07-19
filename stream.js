import fs from "fs";

// Create stream
// Arguments, where to read data from, options object specify the encoding of the stream
const readStream = fs.createReadStream("./docs/testTwo.txt", {
  encoding: "utf8",
});

// Two arguments, event listeners listening to data even on readSteam
// Every time a buffer package of data is received do something
readStream.on("data", (chunk) => {
  console.log("-----NEW CHUNK------");
  console.log(chunk);
});
