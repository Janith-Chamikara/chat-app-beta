import React, { createContext, useState } from "react";
import InputMessage from "./InputMessage";
import Navbar from "./Navbar";
import Messages from "./Messages";

const ChatArea = () => {
  return (
    <div className="relative w-full h-full z-0">
      <div className="absolute top-0 w-full">
        <Navbar/>
      </div>
      <div><Messages /></div>
      
      <div className="absolute bottom-0 ">
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatArea;
