var automeme = require('automeme');

//
// MemeBot constructor. Accepts an IRC client which will be used to output
//    memes.
//
function MemeBot(client) {
  this.client = client;

  if (typeof this.client.addListener !== 'undefined') this.client.on = this.client.addListener;

  this.client.on('message', this.handleMessage.bind(this));
  this.client.on('pm', this.handlePm.bind(this));
}

//
// Handle channel message. Looks for `!meme` and responds with a random meme
//    using automeme.
//
MemeBot.prototype.handleMessage = function(from, to, text) {
  if (/\!meme/i.test(text)) {
    automeme.getMeme()
      .then(function(meme) {
        this.say(to, meme);
      }.bind(this))
      .fail(console.error.bind(this, 'Failed to get meme:'))
      .done();
  }
};

//
// Output the specified message to the default channel.
// All memes come back in uppercase which can get annoying fast...
//    so the output is cleaned up before being sent to the channel.
//
MemeBot.prototype.say = function(channel, msg) {
  this.client.say(channel, msg.toLowerCase().replace('\n', ''));
};

//
// Handle private messages sent to the bot.
//
MemeBot.prototype.handlePm = function(from) {
  automeme.getMeme()
    .then(function(meme) {
      this.client.say(from, meme.toLowerCase().replace('\n', ''));
    }.bind(this))
    .fail(console.error.bind(this, 'Failed to get meme:'))
    .done();
};

//
// Join a room using specific credentials.
//
//    Join a password protected room:
//    bot.join('#yourchannel password');
//
MemeBot.prototype.join = function() {
  return this.client.join(arguments);
};

//
// Leave a room.
//
//    bot.part('#yourchannel');
//
MemeBot.prototype.part = function() {
  return this.client.part(arguments);
};

//
// Expose the MemeBot functionality.
//
module.exports = function(client) {
  return new MemeBot(client);
};
