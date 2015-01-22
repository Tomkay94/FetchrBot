const
    accountSid = 'ACC_SID'
  , authToken  = 'AUTH_TOKEN'
  , Hapi        = require('hapi')
  , querystring = require('querystring')
  , helper      = require('./helper.js')
  , client      = require('twilio')(accountSid, authToken);

/* Configure the Hapi server */
var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply('home');
    }
  },
  {
    method: 'GET',
    path: '/twilioCall',
    handler: function(request, reply) {

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
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
