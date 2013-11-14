var MemeBot = require('./lib/memebot')
  , irc     = require('irc');

module.exports = function(server, channel) {
  var client = new irc.Client(server, 'memebot', {
    channels: [channel]
  });

  return new MemeBot(client);
};
