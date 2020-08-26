const fields = require(DIR + '/validation/fields');
const String = require(DIR + '/utilities/String');
const Exam = require(DIR + '/models/exam');
const Server = require(DIR + '/models/server');
const destructExam = require(DIR + '/jobs/exams/destruct');
const socketOpen = require(DIR + '/socket/open');

module.exports = (req, res) => {;
    let body = req.body;
    let string;
    fields(body, ['name', 'duration'])
    .then(() => {
        string = String.generate(6);
        return Exam.findOne({ code: string })
    }).then(exam => {
        if(exam !== null) return Promise.reject({invalid: 'A room tried to generate with the same code as another'});
        let duration = (Number(body.duration) * 1000 * 60 * 60);
        return Exam.create({code: string, name: body.name, duration})
    }).then(exam => {
        socketOpen(exam);
        res.status(201).json({
            message: 'success',
            code: exam.code,
        });
        destructExam(exam.duration, exam);
        Logger.info('Created exam (' + exam.code + '), destructing in ' + exam.duration + ' milliseconds');
        Server.findOneAndUpdate({}, { $inc: { exams: 1, hours: body.duration } })
        .catch(error => Erros.error(error, 'Failed in incrementing exam count in Server'));
    })
    .catch(error => Errors.response(res, error, 500));
}