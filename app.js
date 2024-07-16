const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/Routes.js');
const setupSwagger = require('./config/Swagger.js');
require('dotenv').config();

app.use(bodyParser.json());
app.use('/api', productRoutes);

setupSwagger(app);

module.exports = app;
