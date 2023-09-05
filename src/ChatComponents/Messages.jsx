import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Pages/Login/LoginAndSignin";
import { DataContext } from "../Components/DataContextprovider";
import Message from "./Message";

const style = {
  messages:
    "absolute top-[60px] p-[15px] w-[800px] h-[500px] space-y-20 overflow-auto ",
};

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(DataContext);
  console.log(messages);
  useEffect(() => {
    const getMessages = () => {
      const unSubscribe = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => unSubscribe();
    };
    data.chatId && getMessages();
  }, [data.chatId]);

  return (
    <div className="relative">
      <div className={style.messages}>
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
