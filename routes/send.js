var twilioClient = require('../twilioClient');
var getSheets = require('./syncWithSheets/getSheets');

module.exports = function(req, res) {
    
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

};