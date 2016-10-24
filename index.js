var http = require('http');
var cfg = require('./config/cfg');
var sms = require('./scheduling/sms');

var getSheets = require('./routes/syncWithSheets/getSheets');
var sheetsIO = require('./googleSheets/sheets-io.js');

// Create Express web app
var app = require('./app');

// Create an HTTP server and listen on the configured port
var server = http.createServer(app);
server.listen(cfg.port, function() {
  console.log('Express server listening on *:' + cfg.port);

  getSheets(function gotSheets(err, rows) {
    if (err) { return }
    console.log('Loaded '+ rows.length +' spreadsheet rows');
    rows.map(sheetsIO.rowToObj).forEach(sms.schedule);
  });
});


