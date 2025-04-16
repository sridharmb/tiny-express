const http = require("http");

const tinyexpress = () => {
  const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };

  const app = {
    get: function (path, handler) {
      routes.GET[path] = handler;
    },
    post: function (path, handler) {
      routes.POST[path] = handler;
    },
    put: function (path, handler) {
      routes.PUT[path] = handler;
    },
    delete: function (path, handler) {
      routes.DELETE[path] = handler;
    },
    listen: function (port, callback) {
      const server = http.createServer((req, res) => {
        const method = req.method;
        const url = req.url;
        const routeHandle = routes[method][url];
        if (routeHandle) {
          routeHandle(req, res);
        }
      });
      server.listen(port, callback);
    },
  };

  return app;
};

const newApp = tinyexpress();
const PORT = 4000;

newApp.get("/", (req, res) => {
  res.writeHead(200, { "content-Type": "text/html" });
  res.write("this is home");
  res.end();
});

newApp.get("/files", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("This if files location");
  res.end();
});

newApp.listen(PORT, () => {
  console.log("its listening on 4000, and its a win");
});
