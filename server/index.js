const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api/reviews', createProxyMiddleware({ target: 'http://localhost:3001' }));
app.use('/api/hostel/1/rooms', createProxyMiddleware({ target: 'http://localhost:3009' }));
app.use('/hostels/:id/hostel', createProxyMiddleware({ target: 'http://localhost:3000' }));
app.use('/hostels/:id/address', createProxyMiddleware({ target: 'http://localhost:3000' }));
app.use('/hostels/:id/description', createProxyMiddleware({ target: 'http://localhost:3000' }));
app.use('/hostels/:id/rules', createProxyMiddleware({ target: 'http://localhost:3000' }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));


app.listen(3030, () => console.log('Proxy Server listening on port 3030'));