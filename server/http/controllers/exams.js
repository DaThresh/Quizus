const fields = require(DIR + '/validation/fields');

const destructExam = require(DIR + '/jobs/exams/destruct');

const String = require(DIR + '/utilities/string');

const Exam = require(DIR + '/models/exam');
const Server = require(DIR + '/models/server');

const socketOpen = require(DIR + '/socket/open');

module.exports = {
    create: function(req, res){
        let body = req.body;
        let string;
        fields(body, ['examName', 'duration'])
        .then(() => {
            string = String.generate(6);
            return Exam.find({ code: string })
        }).then(response => {
            if(response.length > 0){
                throw new Error({'unknown': 'A room tried to generate with the same code as another'});
            } else {
                let duration = (body.duration * 1000 * 60 * 60);
                return Exam.create({code: string, name: body.examName, duration: duration});
            }
        }).then(exam => {
            socketOpen(exam);
            res.status(201).redirect('/join/' + exam.code);
            destructExam(exam.duration, exam);
            Logger.info('Created exam (' + exam.code + '), destructing in ' + exam.duration + ' milliseconds');
            Server.findOneAndUpdate({}, { $inc: { exams: 1, hours: body.duration } })
            .catch(error => Erros.error(error, 'Failed in incrementing exam count in Server'));
        })
        .catch(error => {
            Errors.error(error, 'Failed to create room');
            res.send('Unable to take your request at this time.');
        })
    },
    serve: function(req, res, next){
        let path = DIR + '/build/index.html';
        Exam.countDocuments({ code: req.params.exam })
        .then(count => count > 0 ? res.status(200).sendFile(path) : next())
        .catch(error => Errors.error(error, 'Failed to fetch count on exam'))
    }
}