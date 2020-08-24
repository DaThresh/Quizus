module.exports = (animal, client, nsp) => {
    nsp.emit('room.join', animal);
}