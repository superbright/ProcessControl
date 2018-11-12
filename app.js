var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    app = express();


app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));

const APP_PORT = 5555;

app.get('/', function (req, res) {
    res.render('index');
})

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);



const server = app.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`)
  })
  
const io = require('socket.io').listen(server)


// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);

    socket.on('STARTFROMCONTROLPANEL', (socket) => {
            //pass data to UNITY
            console.log("start");
    });

    socket.on('STOPFROMCONTROLPANEL', (socket) => {
        //pass data to UNITY
            console.log("stop");
    });

});