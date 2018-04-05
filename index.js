const config = require('./config');
require('./lib/server')(config).listen(3000);
