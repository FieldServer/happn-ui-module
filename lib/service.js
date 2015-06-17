function happnUI() {

	var _this = this;
	var http = require('http');

	_this.settings = {};

	_this.start = function(options, callback){
		try{

			if (!options)
				options = {};

			if (options['run-happn'] && !options['happn-config']){
				options['happn-config'] = {
					mode:"embedded"
				};
				options['happn-port'] = 8000;
				options['happn-ip'] = '127.0.0.1';
			}

			_this.settings['happn-ip'] = options['happn-ip']?options['happn-ip']:'127.0.0.1';
			_this.settings['happn-port'] = options['happn-port']?parseInt(options['happn-port']):8000;
			_this.settings['happn-ui-port'] = options['happn-ui-port']?parseInt(options['happn-ui-port']):9999;
			_this.settings['run-happn'] = options['run-happn']?options['run-happn']:false;
			
			var startHappn = function(done){
				_this.happnService = require('@smc/happn').service;
				_this.happnService.initialize
				(
					options['happn-config'], 
					function(e){
						if (!e){
							console.log('Initialized happn service on port ' + _this.settings['happn-port']);
							done();
						}else{
							console.log('Failed to initialize happn service: ' + e);
							done(e);
						}
					}
				);
			}

			var express = require('express');
			var app = express();

			app.use(express.bodyParser());
			app.use(express.cookieParser());
			app.use(express.static(__dirname+'/app'));

			//we proxy to the happn instance - wherever it may be...
			app.get('/browser_client', function(req, res){
			  
				var options = {
				  hostname: _this.settings['happn-ip'],
				  port: _this.settings['happn-port'],
				  path: '/browser_client',
				  method: 'GET'
				};

				var connector = http.request(options, function(happn_res) {
				  happn_res.pipe(res, {end:true});//tell 'response' end=true
				});

				req.pipe(connector, {end:true});

			});

			app.get('/browser_primus.js', function(req, res){
			  
				var options = {
				  hostname: _this.settings['happn-ip'],
				  port: _this.settings['happn-port'],
				  path: '/browser_primus.js',
				  method: 'GET'
				};

				var connector = http.request(options, function(happn_res) {
				  happn_res.pipe(res, {end:true});//tell 'response' end=true
				});

				req.pipe(connector, {end:true});

			});

			app.get('/', function(req, res){
			  res.sendfile(__dirname+'/app/index.htm');
			});



			var startUIService = function(){
				app.listen(_this.settings['happn-ui-port']);
				console.log('Initialized happn ui portal on port ' + _this.settings['happn-ui-port']);
				console.log('You can now navigate to "http://localhost:' + _this.settings['happn-ui-port'] + '" locally');
				console.log('Or to "http://<external ip of this device>:' + _this.settings['happn-ui-port'] + '" from a different device');
				callback(null);
			}

			if (_this.settings['run-happn']){
				startHappn(function(e){
					if (e) return callback(e);
					startUIService();
				});
			} else startUIService();
				
		}catch(e){
			callback(e);
		}
	}
	_this.stop = function(callback){

	}
}

module.exports = happnUI;

