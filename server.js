const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 4322;
const root = __dirname;
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

http
  .createServer((req, res) => {
    let file = decodeURIComponent(req.url.split("?")[0]);
    if (file === "/") file = "/index.html";
    const full = path.join(root, file);
    fs.readFile(full, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
      }
      const ext = path.extname(full).toLowerCase();
      res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, () => console.log(`Serving on http://localhost:${port}`));
