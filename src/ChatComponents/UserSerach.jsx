import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../Pages/Login/LoginAndSignin";
import { AuthContext } from "../Components/AuthContextProvider";

const style = {
  container: "w-[400px] mx-auto text-lg ",
  searchContainer:
    "flex flex-row justify-start gap-[10px]  items-center mt-[20px] w-[60%] ml-[18px]  bg-transparent  text-white  border-b-2 border-gray-200 hover:scale-[105%] hover:w-[350px] transition-all  duration-200 transition-all duration-200 ",
  search:
    " bg-transparent text-lg rounded-none focus:outline-none text-white placeholder:text-lg placeholder:text-white",
  selected: " ml-[20px] text-left text-lg text-white mt-[20px]",
  userCard:
    "flex flex-row text-black font-medium items-center gap-[10px]  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 w-[350px] ml-[20px] mt-[20px] rounded-[10px] hover:scale-[105%] transition-all  duration-200 transition-all duration-200 ",
  profileImgC:
    "relative flex items-center w-[80px] h-[80px] m-[6px] dark:ring-gray-600 ring-2 ring-gray-300 rounded-full",
  profileImg: "  w-[80px] h-[80px] p-1 rounded-full object-cover",
};

const UserSearch = ({ userName, setUserName, selected, setSelected }) => {
  const currentUser = useContext(AuthContext);
  const [user, setUser] = useState(null);
  console.log(user);
  console.log(currentUser);
  const handleSearch = () => {
    const q = query(
      collection(db, "users"),
      where("name", "==", userName.trim())
    );
    onSnapshot(q, (querySnapShot) => {
      querySnapShot.forEach((doc) => setUser(doc.data()));
    });
  };
  const handleKeyDown = (e) => {
    if (userName.trim() === "") {
      setUser(null);
      return;
    }
    e.key === "Enter" && handleSearch();
  };
  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.id
        ? currentUser.uid + user.id
        : user.id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        console.log(combinedId);
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.id,
          name: user.name,
          email: user.email,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.id), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setUserName("");
    setUser(null);
  };

  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <span>
          <svg
            className="h-5 w-5 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
        </span>
        <input
          className={style.search}
          placeholder="Find a user"
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {user ? setSelected(true) : setSelected(false)}
      {user && (
        <div>
          <div className={style.selected}>
            <span>Selected user : {user?.name}</span>
          </div>
          <div className={style.userCard} onClick={handleSelect}>
            <div className={style.profileImgC}>
              <img
                width="60px"
                height="60px"
                className={style.profileImg}
                src={user?.photoURL}
                alt="none"
              />
            </div>

            <div>
              <span>{user?.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
