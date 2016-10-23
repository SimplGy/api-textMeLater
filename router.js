var twilioClient = require('./twilioClient');
var cfg = require('./cfg');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs')


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';



module.exports = function(router) {

  router.get('/syncWithSheets', function(req, res) {

    

    
    console.log("Attempting to sync with Google Sheets...");
    
    authorize(cfg.googleSheetsKeys, function(auth){
      console.log(auth);
      var sheets = google.sheets('v4');

      sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: cfg.sheets[0],
        range: 'A2:E',
      }, function(err, response) {
        if (err) {
          res.status(500).send("Error with google auth");
          console.log('The API returned an error: ' + err);
          return;
        }
        var rows = response.values;
        if (rows.length == 0) {
          console.log('No data found.');
        } else {
          console.log('data', rows)
          let output = rows.map( r => r.join('<br>') ).join('<br><br>')
          res.status(500).send(`<pre>${ output }</pre>`)
        }
      });
    });
  });


  router.get('/send', function(req, res) {
    i++;
    let msg = 'Hi '+ user.name +', here\'s message ' + i;
    twilioClient.sendSms(user.phone, msg, function (err, data) {
      // res.send("worked?")
      if (err) {
        res.status(500).send('Could not sendSms');
        console.log('err', err);
      } else {
        res.status(200).send('sendSms success');
        console.log('data', data);
      }
    });
  });

};




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