const Server = require(DIR + '/models/server');
const success = require('./success');

module.exports = (req, res) => {
    Server.findOne({}).select('questions messages exams hours')
    .then(server => success(res, {server}))
    .catch(error => Errors.response(res, error, 500));
}