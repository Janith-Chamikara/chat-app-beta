import React, { useState } from "react";
import UsersList from "../ChatComponents/UsersList";
import ChatArea from "../ChatComponents/ChatArea";

const Chatapp = () => {
  const [userName, setUserName] = useState("");

  return (
    <div className="flex flex-row justify-center items-center  w-[100vw] h-[100vh]">
      <div className="flex flex-row w-[1200px] h-[600px] rounded-[10px] bg-[#ccc9c9] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <UsersList userName={userName} setUserName={setUserName} />
        <ChatArea userName={userName} setUserName={setUserName} />
      </div>
    </div>
  );
};

export default Chatapp;

/*export const loader = async () => {
  let currentUser = {};
  await new Promise((done) =>
    setTimeout(() => {
      done();
    }, 0)
  );
  onAuthStateChanged(auth, (user) => currentUser.id = user.uid);
  console.log(currentUser);
  return (currentUser ? currentUser : redirect('/'))
};*/
