// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); 
const PORT = process.env.PORT || 8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require('./routes/users-api');
// const resourceApiRoutes = require('./routes/resources-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/resources', resourceApiRoutes);

app.get("/", (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));