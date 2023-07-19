import fs from "fs";

// Read files
// Two arguments, first location, second a function to fire when read completes (async)
// Buffer package of data
// fs.readFile("./docs/testText.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// Write files
// Three arguments, relative path, text to be written, callback function (async)
// fs.writeFile("./docs/testText.txt", " I am new text", () => {
//   console.log("file was written");
// });

// Directories
// Two arguments, name of dir and async callback function
// Delete and create folder based on whether the folder exists already
// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("folder created");
//   });
// } else {
//   fs.rmdir("./assets", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("folder removed");
//   });
// }

// Delete files
// Check if file exits before deleting

if (fs.existsSync("./docs/deleteMe.txt")) {
  fs.unlink("./docs/deleteMe.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}
