import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

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
          new Date(Date.now()).getMinutes(),
      };
      /* We need to emit socket message here and send these info */
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setLastMessage("");
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
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>;
                  </div>

                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="sender">{messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={lastMessage}
          placeholder="Message"
          onChange={(event) => {
            setLastMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        {/* <button onClick={deleteMessage}>X</button> */}
      </div>
    </div>
  );
};

export default Chat;
