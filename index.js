const express = require('express');
const config = require('./config.json');
const Startup = require('./startup');

const setup = new Startup(config);
const app = express();
setup.setupMiddleware(app);
app.listen(8443, () => console.log('listening 8443 port'));
module.exports = app;