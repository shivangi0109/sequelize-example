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
app.use(cors());

// Middleware
app.use(morgan('dev'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const taskApiRoutes = require('./routes/tasks-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/tasks', taskApiRoutes);

// Listener
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));