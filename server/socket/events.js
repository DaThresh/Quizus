const QuestionControllers = {
    create: require('./questions/create'),
    vote: require('./questions/vote'),
}

const MessageControllers = {
    create: require('./messages/create')
}

const RoomControllers = {
    join: require('./room/join')
}

module.exports = (client, nsp) => {
    // Questions
    client.on('questions.create', question => QuestionControllers.create(question, client, nsp));
    client.on('questions.vote', vote => QuestionControllers.vote(vote, client, nsp));

    // Messages
    client.on('messages.create', message => MessageControllers.create(message, client, nsp));

    // Room
    client.on('room.join', animal => RoomControllers.join(animal, client, nsp));

    client.on('disconnect', () => {
        Logger.log('User disconnected from exam ' + nsp.exam.name);
    });
}