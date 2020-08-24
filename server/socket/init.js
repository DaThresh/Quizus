const Exam = require(DIR + '/models/exam');
const Server = require(DIR + '/models/server');

module.exports = (client, nsp) => {
    let deliverableExam;

    Exam.findById(nsp.exam)
    .populate({
        path: 'questions',
        options: { sort: { createdAt: -1 } }
    })
    .then(exam => {
        deliverableExam = exam;
        return Server.findOne({})
    })
    .then(server => client.emit('init', deliverableMapper(deliverableExam, server.animals)))
    .catch(error => Errors.error(error, 'Failed to init socket'))
}

function deliverableMapper(exam, animals){
    let randInt = Math.floor(Math.random() * animals.length);
    return {
        name: exam.name,
        code: exam.code,
        duration: exam.duration,
        questions: exam.questions,
        createdAt: exam.createdAt,
        animals: animals,
        animal: animals[randInt]
    }
}