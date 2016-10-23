# Text Me Later's API

This is an API server for an in-development toy project.

## TODO:

- [x] `GET /send` hard coded text messages via Twilio or similar to my phone
- [x] `GET /syncWithSheets` for a preconfigured google sheet id pull and log out data from them. Each row in the google sheet has all the info needed to send one text message (even phone number).
- [ ] `GET /send/` send messages specified by google sheets structure
- [ ] Select a scheduler or daemon appropriate for this use case (sending text messages at configured times)
- [ ] Send text messages at configured times

## Backlog:

- [ ] `POST /messages` body `{ text: "", frequency: "day", when: "daytime" }` Allow a user (only me for now) to configure messages and timeframes for later delivery to self

