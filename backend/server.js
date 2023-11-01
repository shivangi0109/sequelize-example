// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');

// Connect to PostgreSQL
const sequelize = new Sequelize('sequelize', 'labber', 'labber', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false, // Disable timestamps globally
  },
});

// Define a simple model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
},
{
  tableName: 'tasks',
});

// Sync the model with the database
sequelize.sync().then(() => {
  console.log('Database and tables synced');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3002',
}));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Allow all origins for testing purposes (make more restrictive in production)
app.options('*', cors());

// Middleware
app.use(morgan('dev'));

// Example API route
app.get('/tasks', async (req, res) => {
  try {
    // console.log('Before executing query');
    // const [tasks, metadata] = await sequelize.query('SELECT * FROM Tasks', {
    //   type: QueryTypes.SELECT,
    // });
    // console.log('After executing query');
    // console.log('Fetched tasks:', tasks);
    // console.log('Metadata:', metadata);

    // Use Task.findAll() to fetch all records from the "Tasks" table
    // const tasks = await Task.findAll({
    //   attributes: ['id', 'title', 'description'], // Explicitly specify the columns you want
    // });
    const tasks = await Task.findAll();
    
    console.log('Fetched tasks:', tasks);

    res.json(Array.isArray(tasks) ? tasks : [tasks]); // Ensure tasks is an array
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const taskApiRoutes = require('./routes/tasks-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/tasks', taskApiRoutes);

// Listener
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));