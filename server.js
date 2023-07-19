import http from "http";

//Create server - can be stored in variable
// Server takes in callbck function which runs everytime there is a request into the server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Set header content type
  res.setHeader("Content-Type", "text/plain");

  // Send data back to the browser
  res.write("Hello world this is a node server baby!");

  // Response needs to be ended
  res.end();
});

// Server listening for incoming requests
server.listen(3000, "localhost", () => {
  console.log("now we are listening on port 3000!");
});
