
var UIService = require('../lib/service');
var HappnUI = new UIService();

HappnUI.start({"run-happn":true}, function(e){

	if (e) return console.log('Failed: ' + e);

	console.log('ui_service started');

});

