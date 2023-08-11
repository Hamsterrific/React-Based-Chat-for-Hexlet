install:
	npm ci

launch:
	npx start-server & npm -C frontend start

lint: 
	npx eslint .
