const
    Hapi       = require('hapi')
  , accountSid = 'ACC_SID'
  , authToken  = 'AUTH_TOKEN'
  , client     = require('twilio')(accountSid, authToken);

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

      client.messages.create({
        to:'USER_NUMBER',
        from:'TWILIO_NUMBER',
        body: 'some static message'
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
