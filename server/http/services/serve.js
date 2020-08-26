const path = require('path');
const Exam = require(DIR + '/models/exam');

module.exports = (req, res, next) => {
    let resolvedPath = path.resolve(DIR + '/../public/index.html');
    Exam.countDocuments({ code: req.params.exam })
    .then(count => count > 0 ? res.status(200).sendFile(resolvedPath) : next())
    .catch(error => Errors.error(res, error, 500));
}