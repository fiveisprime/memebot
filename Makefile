SRC = index.js lib/memebot.js spec/memebot-spec.js

test: $(SRC)
	@node node_modules/.bin/jshint $^ \
	--verbose
	@node node_modules/.bin/mocha \
	--require should \
	--reporter spec \
	spec
