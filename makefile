MOCHA=node_modules/.bin/mocha
REPORTER?=tap
FLAGS=--reporter $(REPORTER)

request-spawn:
	$(MOCHA) test/request-spawn-test.js $(FLAGS)