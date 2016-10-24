var cfg = require('./config/cfg');
var client = require('twilio')(cfg.twilio.sid, cfg.twilio.token);



module.exports.sendSms = function(to, message, fn) {
  client.messages.create({
    body: message,
    to: to,
    from: cfg.twilio.phone
  }, fn);
};