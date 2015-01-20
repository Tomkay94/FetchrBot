const
    Hapi        = require('hapi')
  , querystring = require('querystring')
  , accountSid  = 'ACC_SID'
  , authToken   = 'AUTH_TOKEN'
  , client      = require('twilio')(accountSid, authToken);

// Configure the Hapi server
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
      var twilioRequest = request.query;

      /* Text the client */
      client.messages.create({
        to: twilioRequest.From,
        from: twilioRequest.To,
        body: 'Texted: ' + twilioRequest.Body
      }, function(error, message) {
        if (error) {
          console.log(error.message);
        }
      });

      reply('twilioCall executed');
    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
