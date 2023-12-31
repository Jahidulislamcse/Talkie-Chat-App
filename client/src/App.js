import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState();
  const [room, setRoom] = useState();
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    /*It establishes a connection between the user just 
    enter the web and the socket.io room they want to enter */
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Type your name"
            onChange={(event) => {
              setUserName(event.target.value);
              console.log(userName);
            }}
          />

          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
              console.log(room);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
            }}
          />

          <button onClick={joinRoom}>Join the room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  );
}

export default App;
