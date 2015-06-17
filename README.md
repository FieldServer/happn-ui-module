happn-ui-module
==========

*This is an angular ui that allows for the exploration of a happn instance. 
To get it going:*

- (1) git clone "https://github.com/southbite/happn-ui-module.git" && cd happn-ui-module
- (2) npm install
- (3) node test/service_test

The service test starts the happn ui, and also initializes and an embedded happn service:

	var UIService = require('../lib/service');
	var HappnUI = new UIService();

	HappnUI.start({"run-happn":true}, function(e){

		if (e) return console.log('Failed: ' + e);

		console.log('ui_service started');

	});



