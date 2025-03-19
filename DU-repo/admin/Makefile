MAKEFILE := $(lastword $(MAKEFILE_LIST))

.IGNORE:
.PHONY: 

##
## ----------------------------------------------------------------
##    ___  _      _ _        _   _   _                 
##   |   \(_)__ _(_) |_ __ _| | | | | |                
##   | |) | / _` | |  _/ _` | | | |_| |                
##   |___/|_\__, |_|\__\__,_|_|  \___/                 
##      _   |___/      _        ___         _        _ 
##     /_\  __| |_ __ (_)_ _   | _ \___ _ _| |_ __ _| |
##    / _ \/ _` | '  \| | ' \  |  _/ _ \ '_|  _/ _` | |
##   /_/ \_\__,_|_|_|_|_|_||_| |_| \___/_|  \__\__,_|_|
## ----------------------------------------------------------------
##
install: 	## npm install 
	@npm i

dev: 		## npm run dev
	@npm run dev

commit-check:	## lint, test before you commit
	@make lint
	@make test

lint: 		## npm run lint
	@npm run lint

test: 		## npm run test
	@npm run test

coverage:	## npm run coverage
	@npm run coverage

audit:		## npm run audit
	@npm run audit

build: 		## docker build
	@docker build -t du-admin --build-arg DU_NPM_TOKEN=${DU_NPM_TOKEN} --build-arg CI_REGISTRY=registry.bespin.cce.af.mil .

trivy:				## trivy scan
	@trivy image du-admin

##
##
help:		## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

##
.DEFAULT_GOAL := help
