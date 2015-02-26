var colors = require('colors/safe');
var fb = require('fbgraph');

var conf = require('./conf.json');

fb.setAccessToken(conf.accessToken);

var run = function () {
  console.log('Checking...');

  var params = { fields: 'message' };
  fb.get(conf.groupId + '/feed', params, function (err, res) {
    handleError(res, 'getting feed');
    step('got feed')
    latest = res.data[0];
    if (isDesiredMessage(latest.message)) {
      step('found relevant post')
      postIfNotOnList(latest.id);
    }
    else {
      step('post not relevant...')
    }
  });
};

var isDesiredMessage = function (message) {
  return message.indexOf(conf.postPattern) >= 0;
};

var postIfNotOnList = function (messageId) {
  var params = { fields: 'message' };
  fb.get(messageId + '/comments', params, function (err, res) {
    handleError(res, 'getting comments');
    step('got post comments')

    for (var i in res.data) {
      if (res.data[i].message == conf.message) {
        console.log('Your name is already on the list');
        process.exit(0);
      }
    }

    commentOnMessageDelayed(messageId);
  });
};

var commentOnMessageDelayed = function (messageId) {
  step('will send your name in ' + conf.delay + ' seconds');
  clearInterval(timer);
  setTimeout(function () { commentOnMessage(messageId); }, conf.delay * 1000);
};

var commentOnMessage = function (messageId) {
  var params = { message: conf.message };
  fb.post(messageId + '/comments', params, function (err, res) {
    handleError(res, 'posting comment');
    console.log(colors.green('You are now on the list! Have fun ;)'));
    process.exit(0);
  });
};

var handleError = function (response, step) {
  if (response.error) {
    console.log(colors.red.bold('Error ' + step + '.'));
    console.log(response.error.type);
    console.log(response.error.message);
    process.exit(1);
  }
};

var step = function (message) {
  console.log(colors.gray('. ' + message));
};

run();
var timer = setInterval(run, conf.interval * 1000);
