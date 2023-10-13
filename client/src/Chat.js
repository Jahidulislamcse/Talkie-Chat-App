import React, { useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [lastMessage, setLastMessage] = useState("");

  const sendMessage = async () => {
    if (lastMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        message: lastMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      /* We need to emit socket message here and send these info */
      await socket.emit('send_message', messageData)
    }
  };

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message"
          onChange={(event) => {
            setLastMessage(event.target.value);
            console.log(lastMessage);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
