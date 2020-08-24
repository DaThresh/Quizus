const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Question = require('./question');

var examSchema = Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    duration: {
        // Default duration is 1 hour
        type: Number,
        default: (1000 * 60 * 60)
    },
    animals: [String],
}, {timestamps: true});

examSchema.pre('remove', function(next) {
    Question.deleteMany({ exam: this })
    .catch(error => Errors.error(error, 'Failed to delete questions for exam id ' + this._id));
    next();
});

var Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;