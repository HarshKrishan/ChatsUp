"use client"
import React,{useState,useEffect} from 'react'

function Chats({name, room, socket}) {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
      const messageData = {
        name: name,
        room: room,
        message: message,
        send: true,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("sendMessage", messageData);
      setMessageList((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    };

    useEffect(() => {
      socket.on("receiveMessage", (data) => {
        // console.log(data);
        setMessageList((prevMessages) => [...prevMessages, data]);
      });
    }, [socket]);
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-center">Messages</h1>
        <div className="">
          {messageList.map((message) => {
            return message.send ? (
              <div className="text-right">
                <h1 className="text-lg font-medium">{message.message}</h1>
                <p className="text-sm text-gray-700">
                  {message.name} <span className="m-2">{message.time}</span>
                </p>
              </div>
            ) : (
              <div className="text-left ">
                <h1 className="text-lg font-medium">{message.message}</h1>

                <p className="text-sm text-gray-700">
                  {message.name} <span className="m-2">{message.time}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Enter your message"
          className="border-2 border-black rounded-md p-2 m-2"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="border-2 border-black rounded-md p-2 m-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chats