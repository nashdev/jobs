"use strict";

const Slack = require("@slack/client");
const RtmClient = Slack.RtmClient;
const WebClient = Slack.WebClient;
const MemoryDataStore = Slack.MemoryDataStore;
const RTM_CLIENT_EVENTS = Slack.CLIENT_EVENTS.RTM;
const RTM_EVENTS = Slack.RTM_EVENTS;

class Bot {
  constructor(token) {
    this.listeners = [];
    this.rtmClient = new RtmClient(token, {
      logLevel: "error",
      dataStore: new MemoryDataStore(),
      autoReconnect: true,
      autoMark: true
    });

    this.webClient = new WebClient(token);
    this.setupRtmHandlers();
    this.rtmClient.start();
  }

  setupRtmHandlers() {
    this.rtmClient.on(RTM_EVENTS.MESSAGE, message => {
      let user = this.rtmClient.dataStore.getUserById(message.user);
      let text = message.text;
      let type = message.type;
      let subtype = message.subtype;

      if (type === "message" && text) {
        this.hear(message);
      }
    });
  }

  listen(pattern, callback) {
    this.listeners.push({ pattern, callback });
  }

  hear(msg) {
    this.listeners.forEach(listener => {
      let pattern = listener.pattern;
      let callback = listener.callback;
      let matches = msg.text.match(pattern);
      if (matches) {
        callback(msg, matches);
      }
    });
  }

  send(user, msg) {
    this.webClient.im.open(user, (err, resp) => {
      let channelId = resp.channel.id;
      this.rtmClient.sendMessage(msg, channelId);
    });
  }

  post(channelId, msg) {
    this.rtmClient.sendMessage(msg, channelId);
  }
}

module.exports = Bot;
