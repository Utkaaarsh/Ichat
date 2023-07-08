// Node Server which will hand;e socket io connections
const io=require('socket.io')(8000,{
    cors:{
        origin:"*",
    },
});

const users = {};

io.on('connection',(socket)=>{
    socket.on("new-user-joined",async(name)=>{
        
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);

    });


    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{
            message:message,
            name:users[socket.id],
        });
    });

    //disconnects the chat when someone leaves(inbuilt event-not userdefined)
    socket.on('disconnect',(message)=>{
        socket.broadcast.emit("left",users[socket.id]);
        delete users[socket.id];
    });
});