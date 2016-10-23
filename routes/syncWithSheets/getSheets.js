var cfg = require('../../cfg');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');



// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}


module.exports = function getSheets(fn) {
  authorize(cfg.googleSheetsKeys, function(auth){
    google.sheets('v4').spreadsheets.values.get({
      auth: auth,
      spreadsheetId: cfg.sheets[0],
      range: 'A2:E',
    }, function(err, response) {
      if (err) {
        fn(err);
        return;
      }
      var rows = response.values;
      if (rows.length == 0) {
        fn('No data found');
      } else {
        fn(undefined, rows);
      }
    });
  });
}