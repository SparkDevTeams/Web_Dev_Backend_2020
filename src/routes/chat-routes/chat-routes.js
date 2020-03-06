import io from "socket.io";
import {http} from "http";
import app from "../../server";
const {io} = http;



app.get('/chat/:ID',(req,res)=>{

  io.on('connection', function(socket){
    console.log('a user connected');
  
    socket.on('disconnect', function(){
      console.log('user disconnected');
      io.emit('chat message', "you left")
    });
    
    socket.on('chat message', function(msg){
      console.log('message: '+msg)
      socket.broadcast.to(req.params.ID).emit( 'chat message', {somedata : message} );
      io.emit('chat message',msg)
    });
  });


})




