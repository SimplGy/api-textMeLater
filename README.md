# Text Me Later's API

This is an API server for an in-development toy project.

## TODO:

- [x] `GET /send` hard coded text messages via Twilio or similar to my phone
- [ ] `POST /messages` body `{ text: "", frequency: "day", when: "daytime" }` Allow a user (only me for now) to configure messages and timeframes for later delivery to self
- [ ] `GET /send/` send configured messages
- [ ] Select a scheduler or daemon appropriate for this use case (sending text messages at configured times)
- [ ] Send text messages at configured times
