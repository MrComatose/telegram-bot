const express = require('express');
const config = require('config');
const Startup = require('./startup');

const setup = new Startup(config);
const app = express();
setup.setupMiddleware(app);
app.listen(3000, () => console.log('listening 3000 port'));
module.exports = app;