const Question = require(DIR + '/models/question.js');
const Server = require(DIR + '/models/server');

module.exports = (question, client, nsp) => {
    Object.assign(question, {exam: nsp.exam});
    Question.create(question)
    .then(questionObj => nsp.emit('questions.create', questionObj))
    .then(() => Server.findOneAndUpdate({}, { $inc: { questions: 1 } }))
    .catch(error => Errors.error(error, 'Failed to create question'));
}