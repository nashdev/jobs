const events = require("events");

// Create a main event emitter that we can share across the app
module.exports = new events.EventEmitter();
