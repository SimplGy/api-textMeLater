var cron = require('node-schedule');
var twilioClient = require('../twilioClient');
var cfg = require('../config/cfg');




// schedule({
//   cron: '*/10 * * * * * *',
//   phone: 'test',
//   msg: 'Test of `*/10` cron syntax'
// });




/// Required properties:
/// .cron (in format supported by node-schedule)
/// .phone
/// .msg
function schedule(obj) {
  console.log(`Scheduling '${obj.cron}' for '${obj.phone}'. msg: ${obj.msg}`);
  cron.scheduleJob(obj.cron, onScheduledEvent.bind(null, obj));
}

function onScheduledEvent(obj) {
  let d = new Date();
  console.log(`${d.toLocaleString()} onScheduledEvent for ${obj.cron}`)
  cfg.mostRecentEvent = d.getTime();
  twilioClient.sendSms(obj.phone, obj.msg)
}


module.exports = {
  schedule: schedule
}