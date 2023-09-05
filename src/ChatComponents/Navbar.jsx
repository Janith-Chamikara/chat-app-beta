import React, { useContext, useRef } from "react";
import backIcon from "../assests/back.png";
import videoCallIcon from "../assests/cam.png";
import moreIcon from "../assests/more.png";
import closeIcon from "../assests/close.png";
import { DataContext } from "../Components/DataContextprovider";
import { AuthContext } from "../Components/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Pages/Login/LoginAndSignin";

const style = {
  container:
    "flex flex-row justify-between bg-[linear-gradient(_to_left,#060c16,#101b2b,#132842,#15365a,#154474_)] items-center text-white text-lg h-[60px] w-full rounded-tr-[10px] border-left-1 border-grey-300 border-l-2 border-grey-300",
  leftContainer: "flex flex-row items-center gap-[10px]",
  rightConatiner: "flex flex-row justify-between w-[100px] items-center",
  iconContainer: "flex flex-row gap-[15px]",
  moreIcon: "relative",
  userInfo:
    "hidden absolute top-0 right-0 rounded-[10px] w-[250px] h-[200px] bg-white z-50",
  userInfoContainer:
    "flex flex-col h-full w-full items-center justify-center gap-[3px] transition-all duration-500ms",
  closeIcon:
    "absolute top-3 right-3 w-[30px] h-[30px] hover:scale-[105%] transition-all  duration-200 ",
  profileIMGContainer: "relative flex items-center ",
  profileIMG:
    "rounded-full w-[60px] h-[60px] object-cover ring-2 ring-gray-400",
  onlineIndicator:
    "absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2",
  name: " text-black text-lg font-semibold",
  email: " text-black text-sm ",
  button: "bg-gray-800 text-white text-sm px-[10px] py-[4px] rounded-[10px]",
};
const Navbar = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  const { data, dispatch } = useContext(DataContext);
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleClickMenu = (e) => {
    e.preventDefault();
    ref.current.classList.remove("hidden");
  };
  const handleClickClose = (e) => {
    e.preventDefault();
    ref.current.classList.add("hidden");
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .then(() => dispatch({ type: "SIGN_OUT" }))
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.container}>
      <div className={style.leftContainer}>
        <span>
          <img src={backIcon} alt="" width="30px" height="30px" />
        </span>
        <span>{data?.user?.name}</span>
      </div>

      <div className={style.rightConatiner}>
        <div className={style.iconContainer}>
          <span>
            <img src={videoCallIcon} alt="" width="30px" height="30px" />
          </span>

          <span className={style.moreIcon}>
            <button onClick={handleClickMenu}>
              <img
                src={moreIcon}
                className={style.moreIcon}
                alt=""
                width="30px"
                height="30px"
              />
            </button>

            <div className={style.userInfo} ref={ref}>
              <div className={style.userInfoContainer}>
                <button onClick={handleClickClose}>
                  <img src={closeIcon} alt="" className={style.closeIcon} />
                </button>

                <div className={style.profileIMGContainer}>
                  <img
                    className={style.profileIMG}
                    src={currentUser.photoURL}
                  />
                  <div className={style.onlineIndicator}></div>
                </div>
                <span className={style.name}>{currentUser.displayName}</span>
                <span className={style.email}>{currentUser.email}</span>
                <Link className={style.button} onClick={handleSignOut}>
                  Sign Out
                </Link>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
