var twilioClient = require('./twilioClient');
var cfg = require('./cfg');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs')
var getSheets = require('./routes/syncWithSheets/getSheets');



module.exports = function(router) {

  router.get('/syncWithSheets', function(req, res) {
    console.log("Attempting to sync with Google Sheets...");
    getSheets(function(err, rows){
      if (err) {
        res.status(500).send("Error: " + err);
        return;
      }
      let output = rows.map( r => r.join('<br>') ).join('<br><br>');
      res.status(200).send('<pre>'+ output +'</pre>');
      console.log(`Got ${rows.length} rows`)
    });
  });

  router.get('/send', function(req, res) {
    
    console.log('Getting message data from google sheet...');
    getSheets(got);

    let yay = 0;
    let nay = 0;
    let limit;

    function got(err, rows) {
      if (err) {
        res.status(500).send("Error getting Google Sheets data: " + err);
        return;
      }
      limit = rows.length;
      console.log(`Sending ${rows.length} messages...`);
      rows.forEach( row => {
        let phone = row[0];
        let msg = row[1];
        twilioClient.sendSms(phone, msg, sent);
      });
      
    }

    function sent(err, data) {
      if (err) {
        nay++;
        console.log('sendSms error: ', err);
        return;
      }
      yay++;
      console.log('sendSms success: ', data.to, data.body);
      if (yay+nay >= limit) {
        res.status(200).send(`Requested send of all messages. ${yay} Succeeded, ${nay} Failed`);  
      }
    }

  });

};




