class Channel {

  name = 'channel';

  up(res, state) {}

  down(res, state) {}

  stop(res, state) {}

  error(error, res) {}

  timeout(error, res) {}
}

module.exports = Channel;
