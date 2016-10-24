# Text Me Later's API

This is an API server for an in-development toy project.

## Getting Started

    node . // or nodemon .

Run with a debugger:

    node --inspect .


## Aka (ideas)

* Text Chron
* Chron SMS
* Scheduled Texting
* L8tr
* Latr
* Time Machine Text
* SMS Schedule

## Notes:

* Using Twilio with h@
* Scaling without a shortcode may be difficult. Even the shortcode limit is 30ms/sec, which isn't actually all that much. Not sure what my options are. (multiple numbers?)

## TODO:

- [x] `GET /send` hard coded text messages via Twilio or similar to my phone
- [x] `GET /syncWithSheets` for a preconfigured google sheet id pull and log out data from them. Each row in the google sheet has all the info needed to send one text message (even phone number).
- [x] `GET /send/` send messages specified by google sheets structure
- [ ] Get `node-schedule` running, and have a working status page
- [ ] Connect status page to uptime robot
- [ ] Design scheduled message sending:

* If the cron job fails to run, next run should send the missed messages
* No circumstance should cause multiple messages to run
* Limit space to O(n) for tracking which messages have been sent
* Try to improve on O(n) time per tick for running scheduled messages
* Isolate time zone behavior into one testable, functional piece

- [ ] Send text messages at configured times

## Backlog:

- [ ] `POST /messages` body `{ text: "", frequency: "day", when: "daytime" }` Allow a user (only me for now) to configure messages and timeframes for later delivery to self




## Others:

* https://www.textmelater.com/
  * timelines of msg/response
  * phone # confirmation
  * 2-way conversations

* http://textitlater.com/useful.php

Let's say your on a blind date and need a quick excuse to leave. Schedule a text to ourself for durring the middle of the date that says something like "Mom in Hospital....come quickly!!!"

Text yourself reminders on important dates such as anniversaries, birthdays, valentines day, etc...

Text yourself reminders of when sporting or concert tickets go on sale.
Remind yourself of an important due date in the future.

Send yourself a text at the end of the day to remind yourself to buy milk, eggs or any other errands that you may need to run.

Maybe you saw something cool on the internet and want to send yourself the link in a couple of days.

You can send a message to yourself several years in the future such as a list of goals that you would like to accomplish or where you would like to be in life.
