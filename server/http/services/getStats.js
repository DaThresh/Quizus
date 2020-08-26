const Server = require(DIR + '/models/server');

module.exports = (req, res) => {
    Server.findOne({}).select('questions messages exams hours')
    .then(server => res.status(200).json({server}))
    .catch(error => Errors.response(res, error, 500));
}