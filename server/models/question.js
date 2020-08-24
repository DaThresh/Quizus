const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = Schema({
    question: {
        type: String
    },
    answer: {
        type: String
    },
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    }
}, {timestamps: true});

questionSchema.post('save', function(question, next) {
    var Exam = require('./exam');
    Exam.findOneAndUpdate({ _id: question.exam }, { $push: { questions: question } })
    .catch(error => Errors.error(error, 'Failed to add question to Exam array'))
    next();
});

var Question = mongoose.model('Question', questionSchema);
module.exports = Question;