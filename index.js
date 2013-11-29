var MemeBot = require('./lib/memebot')
  , util    = require('util')
  , irc     = require('irc');

module.exports = function(server, channels) {
  var client = new irc.Client(server, 'memebot', {
    channels: util.isArray(channels) ? channels : [channels]
  });

  return new MemeBot(client);
};
