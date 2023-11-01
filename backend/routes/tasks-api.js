/*
 * All routes for tasks are defined here
 * Since this file is loaded in server.js into /tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Tasks Listing Page
router.get('/', (req, res) => {
  res.end('Hello, World!');
});

module.exports = router;