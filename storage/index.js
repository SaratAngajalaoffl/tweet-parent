process.env.TZ = 'Asia/Calcutta';

require = require('esm')(module /*, options*/);
module.exports = require('./app.js');
