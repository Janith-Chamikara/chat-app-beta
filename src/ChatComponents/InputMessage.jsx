import React, { useContext, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Pages/Login/LoginAndSignin";
import { DataContext } from "../Components/DataContextprovider";
import { v4 } from "uuid";
import { AuthContext } from "../Components/AuthContextProvider";

const style = {
  container: "flex flex-row  w-[800px]  rounded-br-[10px] text-lg",
  input: " w-[700px] border-b-2 placeholder:text-sm text-black font-semibold",
  button: "px-[8px] py-[4px] w-[100px] bg-red-600 text-white rounded-br-[10px]",
};
const InputMessage = () => {
  const currentUser = useContext(AuthContext);
  const [text, setText] = useState("");
  const { data } = useContext(DataContext);
  const handleClick = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: v4(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
  };

  return (
    <form className={style.container}>
      <input
        className={style.input}
        type="text"
        placeholder="Enter your message"
        name="message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        type="submit"
        name="intent"
        value="submit"
        className={style.button}
        onClick={(e) => currentUser && handleClick(e)}
      >
        Send
      </button>
    </form>
  );
};

export default InputMessage;
