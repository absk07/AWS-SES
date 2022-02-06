module.exports = function(io) {
    io.on('connection', (socket) => {

        socket.on('counter', ({ kgCount, fruitCount }) => {
            io.emit('count values', { kgCount, fruitCount });
        });

    });
}