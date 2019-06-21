const express = require('express');
const config = require('./config.json');
const Startup = require('./startup');

const setup = new Startup(config);
const app = express();
setup.setupMiddleware(app);
app.listen(3000);

module.exports = app;