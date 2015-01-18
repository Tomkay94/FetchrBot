const
    twilio = require('twilio')
  , hapi   = require('hapi')
  , port   = process.env.PORT || 3000
  , accountSid = 'YOUR_ACCOUNT_SID'
  , authToken = 'YOUR_AUTH_TOKEN_HERE'
  , client = new twilio.RestClient(accountSid, authToken);

client.messages.create({
  to:'SOME_NUMBER',
  from:'TWILIO_NUMBER',
  body:'Hey Thanasi!'
}, function(error, message) {
  if (error) {
    console.log(error.message);
  }
  else {
    console.log("Message sent!");
  }
});

// TODO: Twilio inbound routes
