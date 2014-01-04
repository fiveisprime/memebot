var nock    = require('nock')
  , EE      = require('events').EventEmitter
  , client  = new EE();

require('../lib/memebot')(client);

describe('meme', function() {

  it('should say a meme to the correct channel on `!meme`', function(done) {
    nock('http://api.automeme.net')
      .get('/text?lines=1')
      .reply(200, 'test');

    client.say = function(channel, meme) {
      channel.should.equal('#channel');
      meme.should.equal('test');

      done();
    };

    client.emit('message', 'user', '#channel', '!meme');
  });

  it('should handle private messages', function(done) {
    nock('http://api.automeme.net')
      .get('/text?lines=1')
      .reply(200, 'pm');

    client.say = function(from, meme) {
      from.should.equal('user');
      meme.should.equal('pm');

      done();
    };

    client.emit('pm', 'user');
  });
});
