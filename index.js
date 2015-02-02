const
    Hapi        = require('hapi')
  , Path        = require('path')
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
      /* Send the client the data being requested */
      helper.parseRequestBody(request, function(err, parsedData) {
        if (!err) {
          helper.sendSMSToClient(request, parsedData);
        };
      });
    }
  }
]);

server.start(function() {
  console.log("The magic happens on port " + server.info.port);
});
