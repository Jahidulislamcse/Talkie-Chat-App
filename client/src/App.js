import { useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState();
  const [room, setRoom] = useState();

  const joinRoom = () => {
    /*It establishes a connection between the user just 
    enter the web and the socket.io room they want to enter */
  };

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Type your name"
        onChange={(event) => {
          setUserName(event.target.value);
          console.log(userName);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
          console.log(room);
        }}
      />
      <br />
      <button>Join the room</button>
    </div>
  );
}

export default App;
