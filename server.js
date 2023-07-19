import http from "http";
import fs from "fs";

//Create server - can be stored in variable
// Server takes in callbck function which runs everytime there is a request into the server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Set header content type
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
      break;
  }

  // Send data back to the browser
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.end(data);
    }
  });
  // Response needs to be ended
});

// Server listening for incoming requests
server.listen(3000, "localhost", () => {
  console.log("now we are listening on port 3000!");
});
