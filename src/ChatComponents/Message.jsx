import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Components/AuthContextProvider";
import { DataContext } from "../Components/DataContextprovider";
const styles = {
  sent: `  flex justify-end gap-[10px] items-center w-full text-sm float-right clear-right `,
  recieved: ` flex gap-[10px] justify-start items-center  w-full text-sm float-left clear-left`,
};
const Message = ({ message }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [message]);
  const currentUser = useContext(AuthContext);
  const { data } = useContext(DataContext);

  console.log(message.senderId, currentUser.uid);
  return (
    <>
      <div
        ref={ref}
        className={
          message.senderId === currentUser.uid ? styles.sent : styles.recieved
        }
      >
        <div className=" bg-white text-black font-bold p-2 rounded-lg mb-2 relative shadow-[5px_6px_10px_0px_#718096]">
          <div>{message?.text}</div>
          <div className="absolute right-0 bottom-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-white"></div>
        </div>
        <div className="relative flex flex-col  items-center space-y-1 ">
          <img
            className="rounded-full w-10 h-10 object-cover ring-2 ring-gray-400"
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
          />
          <div class="absolute top-0 right-0 h-2 w-2 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
          <span className="font-bold text-black block text-xs ">
            {message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.name}
          </span>
        </div>
      </div>
    </>
  );
  {
    /* <div className="flex flex-row items-center" >
      <span className="rounded-[10px] text-lg width-[100px] bg-white px-[20px] py-[6px]">Hello</span>
      <img
        src=""
        alt=""
        className=" w-[50px] h-[50px] p-1 rounded-full object-cover"
      />
    </div> */
  }
};

export default Message;
