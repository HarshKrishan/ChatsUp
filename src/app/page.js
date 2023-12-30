"use client";
import Chats from "@/components/Chats";
import React, {useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  
  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
    socket.emit("joinRoom", { name, room });
    alert(`You have joined room: ${room}`); 
    setShowChat(true);
    
  };

  
  return (
    <>

      <div className="flex flex-col justify-center items-center h-screen gap-y-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">Welcome to Chatsup</h1>
          <h2 className="text-2xl font-semibold">Chat with your friends</h2>
        </div>
        {showChat ?(
         <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Enter your name"
            className="border-2 border-black rounded-md p-2 m-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter your room"
            className="border-2 border-black rounded-md p-2 m-2"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className="border-2 border-black rounded-md p-2 m-2"
            onClick={joinRoom}
          >
            Join
          </button>
        </div>
        ):(
        <Chats name={name} room={room} socket={socket} />)}
      </div>
    </>
  );
}
