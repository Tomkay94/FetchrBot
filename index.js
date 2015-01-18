const
    twilio     = require('twilio')
  , Hapi       = require('hapi')
  , accountSid = 'ACC_SID'
  , authToken  = 'AUTH_TOKEN'
  , client     = new twilio.RestClient(accountSid, authToken);

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
    path: '/help',
    handler: function(request, reply) {
      reply('help');
    }
  },
  {
    method: 'GET',
    path: '/{dataStructure}',
    handler: function(request, reply) {
      /* Text the request user */
      client.messages.create({
        to:'INCOMING_NUMBER',
        from:'OUTGOING_NUMBER',
        body: 'Requested: ' + encodeURIComponent(request.params.dataStructure)
      }, function(error, message) {
        if (error) {
          console.log(error.message);
        }
        else {
          console.log('Message successfully sent!');
        }
      });
      reply('Requested: ' + encodeURIComponent(request.params.dataStructure));
    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
