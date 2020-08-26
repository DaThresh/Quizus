const createExam = require('./services/createExam');
const getStats = require('./services/getStats');
const serve = require('./services/serve');

module.exports = (app) => {
    // Get
    app.get('/join/:exam', serve);
    app.get('/stats', getStats);
    
    // Post
    app.post('/create', createExam);

    // Catch
    app.all('*', code404);
}

function code404(req, res){
    res.status(404).send('Page not found');
}