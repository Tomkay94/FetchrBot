const
  data = require('./data.json');

/* Returns the parsed request body for the determined phrase */
exports.parseRequestBody = function(request, callback) {
  var twilioBody  = request.query.Body.split(' ')
    , keyword     = twilioBody[0];

    /* Parse the body according to the data being requested. */
    switch (keyword) {
      case 'learn':
        var content    = twilioBody.slice(1, twilioBody.length - 1)
          , method     = twilioBody[twilioBody.length - 1]
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
    }
    callback(null, resultData);
};
