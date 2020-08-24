module.exports = (timeout, exam) => setTimeout(() => destructExam(exam), timeout);

function destructExam(exam){
    // Fully disassemble the namespace
    let nsp = io.of('/join/' + exam.code);
    let sockets = Object.keys(nsp.connected);
    sockets.forEach(socketId => nsp.connected[socketId].disconnect())
    nsp.removeAllListeners();
    delete io.nsps['/join/' + exam.code];

    // Remove Exam from DB (Exam automatically deletes all associated questions upon delete)
    let { createdAt, code } = exam;
    exam.remove();
    let nowUTC = new Date().getTime();
    Logger.info('Destructed exam (' + code + '), runtime: ' + (nowUTC - createdAt.getTime()));
}