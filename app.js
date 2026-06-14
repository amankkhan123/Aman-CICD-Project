const http = require('http');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'aman-cicd-app' }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Aman Khan - CI/CD Pipeline is up and running. Build healthy!\n');
});

server.listen(PORT, () => {
  console.log(`aman-cicd-app listening on port ${PORT}`);
});
