const
    Hapi        = require('hapi')
  , Path        = require('path')
  , querystring = require('querystring')
  , helper      = require('./helper.js')
  , config      = require('./config.js');

/* Configure the Hapi server */
var server = new Hapi.Server();
server.connection({ port: 3000 });

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates')
});

server.route([
  {
    path: '/public/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: "./public",
        listing: false,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.view('index', {
        title: 'FetchrBot | Home'});
    }
  },
  {
    method: 'GET',
    path: '/twilioCall',
    handler: function(request, reply) {
      /* Check if the request is from Twilio */
      // if(helper.fromTwilio(request) || config.twilio.disableSigCheck) {
        helper.parseRequestBody(request, function(err, parsedData) {
          if (!err) {
            helper.sendTextToClient(request, parsedData);
          };
        });
      // }
      /* Not a valid Twilio request */
      // else {
      //  reply(Hapi.error.unauthorized('Not a valid Twilio request'));
      // };
    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
