var config = {}

config.twilio                 = {};
config.twilio.disableSigCheck = false;
config.twilio.messagingUrl    = 'YOUR_TWILIO_RESPONSE_URL';
config.twilio.accountSid      = process.env.TWILIO_ACCOUNT_SID;
config.twilio.authToken       = process.env.TWILIO_AUTH_TOKEN;

module.exports = config;
