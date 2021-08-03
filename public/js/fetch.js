const r = new snoowrap({
  userAgent: 'put your user-agent string here',
  clientId: 'put your client id here',
  clientSecret: 'put your client secret here',
  refreshToken: 'put your refresh token here'
});

r.getNew().then(console.log);

// var snoowrap = require('snoowrap/src/snoowrap.js');
/*require(['snoowrap/src/snoowrap.js'], function (snoowrap) {
    //snoowrap is now loaded.
}); */