import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [lastMessage, setLastMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      // setLastMessage("");
    }
  };

  const deleteMessage = () => {
    setMessageList("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div className="message">
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>;
                </div>
                <div className="message-meta">
                  <p>{messageContent.time}</p>
                  <p>{messageContent.sender}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message"
          onChange={(event) => {
            setLastMessage(event.target.value);
            // console.log(lastMessage);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        {/* <button onClick={deleteMessage}>X</button> */}
      </div>
    </div>
  );
};

export default Chat;
