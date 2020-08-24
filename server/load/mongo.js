const mongoose = require('mongoose');

let mongoString;
let name = DATABASE['NAME'];
let host = DATABASE['HOST'];
let port = DATABASE['PORT'];
let username = DATABASE['USERNAME'];
let password = DATABASE['PASSWORD'];
let protocal = DATABASE['SRV'] ? 'mongodb+srv://' : 'mongodb://';
let options = DATABASE['OPTIONS'];

username ?
    mongoString = protocal + username + ':' + password + '@' + host :
    mongoString = protocal + host;

if(!DATABASE['SRV']){
    mongoString += ':' + port;
}
mongoString += '/' + name;

let optKeys = Object.keys(options);
if(optKeys.length > 0){
    let opts = [];
    optKeys.forEach(key => {
        opts.push(
            key + '=' + String(options[key])
        );
    })
    mongoString += '?' + opts.join('&');
}

var Server;
mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        const Exam = require(DIR + '/models/exam');
        return Exam.deleteMany({})
    }).then(() => {
        const Question = require(DIR + '/models/question');
        return Question.deleteMany({})
    }).then(() => {
        Server = require(DIR + '/models/server');
        return Server.countDocuments()
    }).then(count => {
        return count === 0 ? Server.create({}) : Server.findOne({})
    }).then(server => {
        if(server !== undefined || server.animals === []) server.setDefaultAnimals();
    })
    .catch(error => {
        Errors.fatal(error, 'Failed to connect to database');
    });