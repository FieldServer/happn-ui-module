var expect = require('expect.js');
var happn = require('@smc/happn')
var service = happn.service;
var happn_client = happn.client;
var async = require('async');
var UIService = require('../lib/service');
var HappnUI = new UIService();

describe('e2e test', function() {

	var testport = 8000;
	var test_secret = 'test_secret';
	var mode = "embedded";
	var default_timeout = 4000;

	it('should initialize the service', function(callback) {
		
		this.timeout(20000);

		try{
			service.initialize({
					mode:'embedded', 
					services:{
						auth:{
							path:'./services/auth/service.js',
							config:{
								authTokenSecret:'a256a2fd43bf441483c5177fc85fd9d3',
								systemSecret:test_secret
							}
						},
						data:{
							path:'./services/data_embedded/service.js',
							config:{}
						},
						pubsub:{
							path:'./services/pubsub/service.js',
							config:{}
						}
					},
					utils:{
						log_level:'info|error|warning',
						log_component:'prepare'
					}
				}, 
				function(e){
					callback(e);
				});
		}catch(e){
			callback(e);
		}
	});


	it('should create the ui service', function(callback) {
		this.timeout(default_timeout);

		try{
		  HappnUI.start({}, function(e, ui_service){

		  	if (e) return callback(e);

		  	console.log(ui_service);

		  	callback(e);

		  });
		}catch(e){
		  callback(e);
		}
	});

});