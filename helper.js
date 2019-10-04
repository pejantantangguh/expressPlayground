exports.moment = require('moment');
exports.siteName = 'Express Playground';

const fs = require('fs');

exports.dump = (obj) => JSON.stringify(obj, null, 2)