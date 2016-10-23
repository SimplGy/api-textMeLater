const cfg = {
  twilio: require('./.credentials/twilio.json'),
  sheets: require('./googleSheets.json'),
  googleSheetsKeys: require('./.credentials/sheets.json')
};


// if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
//   dotenv.config({path: '.env'});
// } else {
//   dotenv.config({path: '.env.test', silent: true});
// }

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

var requiredConfig = [cfg.twilio.sid, cfg.twilio.token, cfg.twilio.phone];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  throw new Error('TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.');
}



module.exports = cfg;