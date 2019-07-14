// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InpVWEdEeWFMSiIsImlhdCI6MTU2MjkwMjA1MjA1MSwiZXhwIjoxNTYyOTg4NDUyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTQ0Mjk2NzIwNCwiZW1haWwiOiJiZWpvamVmZnJpbjIzQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiSmVmZnJpbiIsImZpcnN0TmFtZSI6IkJlam8iLCJ1c2VySWQiOiJDcmtZMnRDbGsifX0.bDJuL23ZA4PMyYASxYfDJBjmqDz7elWdrjc-qeZ0iGA"
const userId= "CrkY2tClk"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'pQgco9aCY',//putting user2's id here 
  receiverName: "Mr Xyz",
  senderId: userId,
  senderName: "Bejo Jeffrin"
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


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Bejo Jeffrin")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
