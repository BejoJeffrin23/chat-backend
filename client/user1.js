// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ilc3YlNhb2hCaiIsImlhdCI6MTU2MjkwMjUzMDUwNCwiZXhwIjoxNTYyOTg4OTMwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTQ0Mjk2NzIwNCwiZW1haWwiOiJhbnRvYmVuaXN0ZXIyM0BnbWFpbC5jb20iLCJsYXN0TmFtZSI6IkplZmZyaW4iLCJmaXJzdE5hbWUiOiJCZWpvIiwidXNlcklkIjoicFFnY285YUNZIn19.SrpDkFFix6qmQ6NXj_X2xDNAPPG-mSuPu2vOKSEM-bk"
const userId = "pQgco9aCY"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'CrkY2tClk',//putting user2's id here 
  receiverName: "Bejo Jeffrin",
  senderId: userId,
  senderName: "Mr Xyz"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Mr Xyz")

  })




}// end chat socket function

chatSocket();
