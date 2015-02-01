const
    accountSid = 'ACC_SID'
  , authToken  = 'AUTH_TOKEN'
  , Hapi        = require('hapi')
  , Path        = require('path')
  , querystring = require('querystring')
  , client      = require('twilio')(accountSid, authToken)
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
      if(helper.fromTwilio(request) || config.twilio.disableSigCheck) {
        helper.parseRequestBody(request, function(err, parsedData) {

          if (!err) {
            /* Text the client */
            client.messages.create({
              to: request.query.From,
              from: request.query.To,
              body: parsedData
            }, function(error, message) {
              if (error) {
                console.log(error.message);
              }
            });
          }

      });
      }
      // Not a valid Twilio request
      else {
        reply(Hapi.error.unauthorized('Not a valid Twilio request'));
      }
    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
