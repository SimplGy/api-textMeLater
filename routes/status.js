var schedule = require('node-schedule');
var cfg = require('../config/cfg');

// var rule = new schedule.RecurrenceRule();
// rule.minute = 03;
 
// var j = schedule.scheduleJob(rule, function(){
//   console.log('The answer to life, the universe, and everything!');
// });

// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
// rule.hour = 17;
// rule.minute = 0;
 
// var j = schedule.scheduleJob(rule, function(){
//   console.log('Today is recognized by Rebecca Black!');
// });

// /* This runs at 2:30AM on every Sunday */
// schedule.scheduleJob({hour: 2, minute: 30, dayOfWeek: 0}, function(){
//   console.log('This runs at 2:30AM on every Sunday');
// });

// schedule.scheduleJob({ minute: [0,15,30,45] }, function() {
//   let d = new Date();
//   console.log(d.getHours() + ':'+ d.getMinutes() +' This runs at the 0th, 15th, 30th, and 45th mintue of every hour using object syntax.');
// });

// schedule.scheduleJob('0 0,10,20,30,40,50 * * * * *', function() { // works

// '0 18 * * *' // 7:00p

module.exports = function(req, resp) {
  let scheduledJobs = Object.keys(schedule.scheduledJobs).length
  let minsSince = (Date.now() - cfg.mostRecentEvent) / 1000 / 60;
  minsSince = Math.ceil(minsSince * 10) / 10;

  let html = `
    <h1>Status Page</h1>

    <h2>node-schedule</h2>
    <ul>
      <li>scheduledJobs: ${scheduledJobs}</li>
      <li>Last Job Run: ${ Number.isNaN(minsSince) ? 'never' : minsSince + ' mins ago' }</li>
    </ul>
  `;

  if (scheduledJobs <= 0) {
    console.error('No scheduled jobs')
    resp.status(500).send(html);
    return;
  }
  if (Number.isNaN(minsSince)) {
    console.error('No event in recorded history (can happen upon initial restart)');
    resp.status(500).send(html);
    return;
  }
  let daysSince = minsSince / 60 / 24;
  if (daysSince > 7) {
    console.error('More than 7 days since the last event: ', daysSince);
    resp.status(500).send(html);
    return;
  }
  resp.status(200).send(html);
};