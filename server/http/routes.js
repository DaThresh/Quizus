const fs = require('fs');

const rooms = require('./controllers/exams');

const Server = require(DIR + '/models/server');

module.exports = (app) => {
    app.get('/', renderIndex);
    
    // Rooms
    app.post('/create', rooms.create);
    app.get('/join/:exam', rooms.serve);

    app.get('/public/*', sendStatic);
    app.get('/build/*', sendStatic);
    app.get('/favicon.ico', sendIcon);

    app.all('*', code404);
}

function renderIndex(req, res){
    Server.findOne({})
    .then(server => res.status(200).render('index', server))
    .catch(error => Errors.error(error, 'Failed to load index'));
}

function sendStatic(req, res, next){
    if(fs.existsSync(DIR + req.path)) res.sendFile(DIR + req.path);
    else next();
}

function sendIcon(req, res){
    res.sendFile(DIR + '/favicon.ico');
}

function code404(req, res){
    res.status(404).send('Page not found');
}