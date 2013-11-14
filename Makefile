SRC = index.js lib/memebot.js

test: $(SRC)
	@node node_modules/.bin/jshint $^ \
	--verbose
