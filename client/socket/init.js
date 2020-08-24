function init(exam, socket){
    global.questions = exam.questions;
    exam.animals.forEach(animal => global.animals[animal.name] = animal);
    global.animal = exam.animal.name;
    delete exam.questions;
    delete exam.animals;
    socket.emit('room.join', exam.animal);
    global.exam = exam;
    delete exam.animal;
}

export default init;