import fs from "fs";

// Create stream
// Arguments, where to read data from, options object specify the encoding of the stream
const readStream = fs.createReadStream("./docs/testTwo.txt", {
  encoding: "utf8",
});
// Pass data down a write stream
const writeStream = fs.createWriteStream("./docs/newTest.txt");

// Two arguments, event listeners listening to data even on readSteam
// Every time a buffer package of data is received do something
// readStream.on("data", (chunk) => {
//   console.log("-----NEW CHUNK------");
//   console.log(chunk);
//   writeStream.write("\n NEW CHUNK\n");
//   writeStream.write(chunk);
// });

// Piping
// Open readStream, everytime we get a chunk pipe into writeStream

readStream.pipe(writeStream);
