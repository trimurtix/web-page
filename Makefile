install:
	meteor npm i
dev:
	meteor
deploy-setup:
	cd .deploy && mupx setup
deploy:
	cd .deploy && mupx deploy
