const Question = require(DIR + '/models/question');

module.exports = (vote, client, nsp) => {
    Question.findByIdAndUpdate(vote.question, getUpdateObj(vote), { new: true, select: '_id votes' })
    .then(question => nsp.emit('questions.vote', question))
    .catch(error => Errors.error(error, 'Unable to cast vote on question' + vote.question));
}

function getUpdateObj(vote){
    let $inc = {};
    $inc[`votes.${vote.direction}`] = 1;
    if(vote.revoke){
        let opposite = vote.direction == 'up' ? 'down' : 'up';
        $inc[`votes.${opposite}`] = -1;
    }
    return { $inc: $inc };
}

// Vote Object Schema
// {
//     direction: 'up'/'down'
//     question: ObjectID
//     revoke: true/false
// }
// Client handles logic for not submitting a vote twice per question
// Revoke is set to true if the user is CHANGING their previous vote (ex. was up, now wants to vote down)