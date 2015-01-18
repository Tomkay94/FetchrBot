const
    twilio     = require('twilio')
  , Hapi       = require('hapi')
  , accountSid = 'YOUR_ACCOUNT_SID'
  , authToken  = 'YOUR_AUTH_TOKEN_HERE'
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
      reply('Requested: ' + encodeURIComponent(request.params.dataStructure));
    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});

/* Twilio API SMS Send Test*/
// client.messages.create({
//   to:'SOME_NUMBER',
//   from:'TWILIO_NUMBER',
//   body:'Hey there!'
// }, function(error, message) {
//   if (error) {
//     console.log(error.message);
//   }
//   else {
//     console.log("Message sent!");
//   }
// });
