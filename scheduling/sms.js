var cron = require('node-schedule');
var twilioClient = require('../twilioClient');
var app = require('../app');




schedule({
  cron: '0 */2 * * * * *',
  phone: 'test',
  msg: 'Test of `0 */2` cron syntax'
});




/// Required properties:
/// .cron (in format supported by node-schedule)
/// .phone
/// .msg
function schedule(obj) {
  console.log(`Scheduling '${obj.cron}' for '${obj.phone}'. msg: ${obj.msg}`);
  cron.scheduleJob(obj.cron, onScheduledEvent);
}

function onScheduledEvent(obj) {
  let d = new Date();
  console.log(`${d.toLocaleString()} onScheduledEvent for ${obj.cron}`)
  app.mostRecentEvent = d.getTime();
  twilioClient.sendSms(obj.phone, obj.msg)
}


module.exports = {
  schedule: schedule
}