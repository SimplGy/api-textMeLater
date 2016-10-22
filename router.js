var twilioClient = require('./twilioClient');



let i = 0;
let user = {
  name: "Eric",
  phone: "+18505671587"
};

module.exports = function(router) {
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