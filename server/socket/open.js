const events = require('./events');
const init = require('./init');

module.exports = (exam) => {
    var nsp = io.of('/join/' + exam.code);
    nsp.exam = exam;

    nsp.on('connection', (client) => {
        Logger.log('User joined exam ' + exam.name);
        
        init(client, nsp);
        events(client, nsp);
    });
    return nsp;
}