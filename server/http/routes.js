const path = require('path');
const Exam = require(DIR + '/models/exam');
const createExam = require('./services/createExam');
const getStats = require('./services/getStats');

module.exports = (app) => {
    // Get
    app.get('/join/:exam', serveApp);
    app.get('/stats', getStats);
    
    // Post
    app.post('/create', createExam);

    // Catch
    app.all('*', code404);
}

function serveApp(req, res, next){
    let resolvedPath = path.resolve(DIR + '/../public/index.html');
    Exam.countDocuments({ code: req.params.exam })
    .then(count => count > 0 ? res.status(200).sendFile(resolvedPath) : next())
    .catch(error => Errors.error(res, error, 500));
}

function code404(req, res){
    res.status(404).send('Page not found');
}