import {useState } from "react";
import * as Components from "./Components";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import addAvatar from "../../assests/addAvatar.png";
import { redirect, useActionData } from "react-router-dom";
import { setDoc, getFirestore, doc } from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,

} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0IUpZ4_nm_RlW_F6LUTrrhBch5-GlN1w",
  authDomain: "chat-app-f1d2e.firebaseapp.com",
  projectId: "chat-app-f1d2e",
  storageBucket: "chat-app-f1d2e.appspot.com",
  messagingSenderId: "156536950086",
  appId: "1:156536950086:web:815bbe98282d1b19182947",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);

const styles = {
  label: "flex flex-row gap-4 items-center mb-[10px]",
  img: "w-[30px] h-[30px]",
};

function LoginAndSignin() {
  const [signIn, toggle] = useState(true);
  const error = useActionData();
  console.log(error);

  return (
    <Components.flexContainer>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form1 method="post">
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Your Name" name="name" />
            {error?.name && (
              <Components.errorShowing>{error.name}</Components.errorShowing>
            )}
            <Components.Input type="text" placeholder="Email" name="email" />
            {error?.email && (
              <Components.errorShowing>{error.email}</Components.errorShowing>
            )}
            <Components.Input
              type="text"
              placeholder="Password"
              name="password"
            />
            {error?.password && (
              <Components.errorShowing>
                {error.password}
              </Components.errorShowing>
            )}
            <Components.Input
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
            {error?.confirmPassword && (
              <Components.errorShowing>
                {error.confirmPassword}
              </Components.errorShowing>
            )}
            <label htmlFor="profileImg" className={styles.label}>
              <span>
                <img src={addAvatar} alt="" className={styles.img} />
              </span>
              <span>Upload a profile image</span>
            </label>
            <Components.Input
              id="profileImg"
              type="file"
              name="profileImg"
              className="hidden"
            />
            <Components.Button type="submit" name="intent" value="signUpForm">
              Sign Up
            </Components.Button>
          </Components.Form1>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form1 method="post">
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="text" placeholder="Your Name" name="name" />
            {error?.name && (
              <Components.errorShowing>{error.name}</Components.errorShowing>
            )}
            <Components.Input type="text" placeholder="Email" name="email" />
            {error?.email && (
              <Components.errorShowing>{error.email}</Components.errorShowing>
            )}
            <Components.Input
              type="text"
              placeholder="Password"
              name="password"
            />
            {error?.password && (
              <Components.errorShowing>
                {error.password}
              </Components.errorShowing>
            )}
            <Components.Input
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
            {error?.confirmPassword && (
              <Components.errorShowing>
                {error.confirmPassword}
              </Components.errorShowing>
            )}
            <Components.Button type="submit" name="intent" value="signInForm">
              Sign In
            </Components.Button>
          </Components.Form1>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Don't have an account yet ?</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.flexContainer>
  );
}

export default LoginAndSignin;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const intent = formData.get("intent");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const file = document.getElementById("profileImg").files[0];
  const fileName = formData.get("profileImg");
  console.log(file);
  const error = {};
  if (typeof name !== "string") {
    error.name = "Please enter a valid name";
  }
  if (typeof email !== "string" || !email.includes("@")) {
    error.email = "That doesn't look like a valid email address!";
  }
  if (typeof password !== "string" || password.length < 6) {
    error.password = "Password's length should be greater than 6!";
  }
  if (typeof confirmPassword !== "string" || confirmPassword !== password) {
    error.confirmPassword = "Given 2 passwords are different!";
  }
  if (Object.keys(error).length) {
    return error;
  }

  if (intent === "signUpForm") {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `images2/${fileName}`);
      const metadata = {
        contentType: "image/jpg,webp,png",
      };
      await uploadBytes(storageRef, file, metadata).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          //create user on firestore
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: name,
            email: email,
            id: auth.currentUser.uid,
            photoURL: downloadURL,
          });
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userChats", auth.currentUser.uid), {});
        });
      });
    } catch (err) {
      if (err === "Firebase: Error (auth/email-already-in-use)") {
        error.email = "Email already in use";
        return error;
      } else console.log(err);
    }
  }
  if (intent === "signInForm") {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("A user has logged in");
    } catch (err) {
      if (err === "Firebase: Error (auth/wrong-password)") {
        error.password = "Wrong password";
        return error;
      } else console.log(err);
    }
  }
  return redirect("home");
};
