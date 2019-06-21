const express = require('express');
const app = express();
app.get('/', (req, res) => {
   res.json({ state: 'Running' });
});
app.get('/ping', (req, res) => {
   res.json({ state: 'Running' });
});
app.listen(3000, () => console.log('listening 3000 port'));
module.exports = app;