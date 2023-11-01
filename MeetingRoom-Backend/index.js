const express = require('express');
const exhbs = require('express-handlebars');
const app = express();
const http=require('http');
const appConfig=require('./Config/appConfig');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const toastr = require('toastr')
const route = require('./route/route');
const corss = require('cors');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const hbs = exhbs.create({
    strict: false,
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    console.log(__dirname);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(corss)

app.use(route.setRouter)


//creating HTTP server

const server=http.createServer(app)
//start listening to http server

server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)



//error listener for http server 'error' event.
function onError(error){
    console.log(error)
    if(error.syscall !== 'listen')  {
        
        throw error;
    }
    switch(error.code) {
        case 'EACCES':
            process.exit(1)
            break;
         case 'EADDRINUSE':
             process.exit(1)
             break;
         default:
            
    }
}

//event listener for Http server 'listening' event;
    function onListening(){
        console.log('started')
        var addr=server.address()
        var bind=typeof addr === 'string'?'pipe'+addr:'port'+addr.port;
        ('Listening on'+bind)
        console.log(bind)
        
    }


mongoose.connect('mongodb://127.0.0.1:27017/MeetingRoom', {useNewUrlParser: true,useUnifiedTopology:true});


mongoose.connection.on('error',function(err){
    console.log('database connection is error')
    console.log(err)
})

mongoose.connection.on('open',function(err){
   if(err){ 
       console.log('database error')
       console.log(err)
   } else {
       console.log('database connection is open success ')
   }
})