const http = require('http');

const parseName = function (request, callback) {
   let name = '';
  request.on('data', (chunk) => {
     name += chunk.toString();
   });
   request.on('end', () => {
      callback(JSON.parse(name));
   });
};

const requestListener = function (req, res) {
   if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200);
      res.end('Hello World, Welcome to WeJapa Internships');
   }
   if (req.url === '/' && req.method === 'POST') {
      res.writeHead(200);
      parseName(req, (result) => {
         res.end(`Hello ${result.name}, Welcome to WeJapa Internships`);
      });
   }
};

const server = http.createServer(requestListener);

const port = 3000;

server.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});