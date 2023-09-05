import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Pages/Login/LoginAndSignin";
import UserSearch from "./UserSerach";
import { AuthContext } from "../Components/AuthContextProvider";
import { DataContext } from "../Components/DataContextprovider";

const style = {
  container:
    "h-[600x] text-white text-lg bg-[linear-gradient(_to_right_top,#060c16,#101b2b,#132842,#15365a,#154474_)] rounded-tl-[10px] rounded-bl-[10px] ",
  userCard:
    "flex flex-row text-black font-medium items-center gap-[10px]  bg-gray-300 w-[350px] ml-[20px] mt-[20px] rounded-[10px] hover:scale-[105%] transition-all duration-200 ",
  profileImgC:
    "relative flex items-center w-[80px] h-[80px] m-[6px] dark:ring-gray-600 ring-2 ring-gray-300 rounded-full",
  receiver: "ml-[20px]  font-medium text-left text-lg  mt-[20px]",
  userName: "p-[5px] text-left text-lg ",
  profileImg: "  w-[80px] h-[80px] p-1 rounded-full object-cover",
  selected: "h-[300px] overflow-auto",
  notSelected: "h-[480px] overflow-auto ",
};

const UsersList = ({ userName, setUserName }) => {
  const currentUser = useContext(AuthContext);
  const { dispatch, data } = useContext(DataContext);
  const [selected, setSelected] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUser = () => {
      const unSubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setUsers(doc.data());
        }
      );
      return () => unSubscribe();
    };
    currentUser && getUser();
  }, [users]);
  const handleClick = (user) => {
    dispatch({ type: "USER_CHANGED", payload: { ...user } });
  };
  return (
    <div className={style.container}>
      <UserSearch
        userName={userName}
        setUserName={setUserName}
        selected={selected}
        setSelected={setSelected}
      />
      <div className={style.receiver}>Available Users</div>
      <ul className={selected ? style.selected : style.notSelected}>
        {users &&
          Object?.entries(users)?.map((user) => (
            <li key={user[0]}>
              <div
                className={style.userCard}
                onClick={() => handleClick(user[1]?.userInfo)}
              >
                <div className={style.profileImgC}>
                  <img
                    width="60px"
                    height="60px"
                    className={style.profileImg}
                    src={user[1]?.userInfo?.photoURL}
                    alt="none"
                  />
                  <div class="absolute top-0 right-0 h-4 w-4 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                </div>
                <div className="flex flex-col ">
                  <span className="font-bold">{user[1]?.userInfo?.name}</span>
                  <span className="text-sm">{user[1]?.lastMessage?.text}</span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UsersList;
