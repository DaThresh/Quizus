const Server = require(DIR + '/models/server');

module.exports = (message, client, nsp) => {
    nsp.emit('messages.create', message);
    Server.findOneAndUpdate({}, { $inc: { messages: 1 } })
    .catch(error => Errors.error(error, 'Failed to increment messages'));
}