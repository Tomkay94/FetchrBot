const
  data = require('./data.json');

/* Returns the parsed request body and data for the determined phrase */
exports.parseRequestBody = function(request, callback) {
    /* Clean and parse the request body */
    var twilioBody  = request.query.Body.split(' ');
    twilioBody      = twilioBody.map(function(element) {
      return element.toLowerCase().trim();
    });
    var keyword     = twilioBody[0];

    /* Retrieve the requested data based on the parsed body. */
    switch (keyword) {
      case 'learn':
        /* Get the requested term, which is after keyword and before last word */
        var content    = twilioBody.slice(1, twilioBody.length - 2).join(' ')
          , method     = twilioBody[twilioBody.length - 2]
          , resultData = data[keyword][content][method].join('\n');
        break;

      case 'how':
        // 'to make a fire'
        var askedData  = twilioBody.slice(1, twilioBody.length)
          , resultData = data[keyword][askedData];
        break;

      case 'random':
        var lowerBound = twilioBody[1]
          , upperBound = twilioBody[2];
        break;

      case 'coinflip':
        // var resultData = Math.random(), 1 or 2
        // nothing, return H or T randomly with P(H,T) = 0.5
        break;

      case 'help':
        // give tutorial of possible commands
        break;

      default:
        resultData = "There was a problem :( text help for instructions on using FetchrBot.";
        break;
    }
    callback(null, resultData);
};
