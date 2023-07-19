import fs from "fs";

// Read files
// Two arguments, first location, second a function to fire when read completes (async)
// Buffer package of data
fs.readFile("./docs/testText.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

// Write files

// Directories

// Delete files
