import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Message {
  id: number;
  body: string;
  author: string;
}

const apiURL = "http://localhost:6060/messages";
const socket = io(apiURL, {});

function App() {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [author, setAuthor] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    return;
  };

  const joinRoom = () => {
    socket.emit("join", author, (response: any) => {
      setConnected(true);
    });
    return;
  };

  useEffect(() => {
    if (isConnected) {
      socket.emit("find-all", {}, (response: any) => {
        setMessages(response);
      });
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="chat-wrapper">
        <div className="greeting-input-wrapper">
          <h1 className="greeting-title">
            Welcome to the Awesome chat application ❤️
          </h1>
          <input
            className="input"
            value={author || ""}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="button" onClick={joinRoom}>
            Join room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-wrapper">
      <h1 className="greeting-title">You have authenticated as {author}</h1>
      <div>
        {messages.map((message) => {
          const isMine = message.author === author;
          return (
            <div
              key={`chat_message-${message.id}`}
              className={isMine ? "message-mine" : "message-foreign"}
            >
              <span>{message.author}</span>
              <p>{message.body}</p>
            </div>
          );
        })}
      </div>
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default App;
