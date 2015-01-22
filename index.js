const
    accountSid = 'ACC_SID'
  , authToken  = 'AUTH_TOKEN'
  , Hapi        = require('hapi')
  , querystring = require('querystring')
  , data        = require('./data.json')
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
      var twilioRequest = request.query;

      /* Parse the request body */
      var twilioBody = request.query.Body.split(' ');
      twilioBody = twilioBody.map(function(element) {
        return element.toLowerCase().trim();
      });

      var returnData = data[twilioBody[0]][twilioBody[1]][twilioBody[2]];
      if (returnData instanceof Array) {
        returnData = returnData.join('\n');
      };

      /* Text the client */
      client.messages.create({
        to: twilioRequest.From,
        from: twilioRequest.To,
        body: returnData
      }, function(error, message) {
        if (error) {
          console.log(error.message);
        }
      });

    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
