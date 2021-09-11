import "./Login.css";
import linkedinlogo from "./Linkedin-Logo.png";
import { useState } from "react";
import { firebaseApp } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
export default function Login() {
  const [fullName, setfullName] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, Setpassword] = useState("");
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    if (!fullName) {
      return alert("full name is required for registering");
    }
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullName,
          photoURL: picUrl,
        })
          .then((c) => {
            console.log(c);

            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
              })
            );
          })
          .catch((e) => console.log(e));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const loginToApp = (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then((userauth) => {
        dispatch(
          login({
            email: userauth.user.email,
            uid: userauth.user.uid,
            displayName: userauth.user.displayName,
            photoURL: userauth.user.photoURL,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="login">
      <img src={linkedinlogo} alt="linkedinLogo" />
      <form>
        <input
          onBlur={(e) => setfullName(e.target.value)}
          onChange={(e) => setfullName(e.target.value)}
          type="text"
          value={fullName}
          placeholder="Full name (required for registering)"
        />
        <input
          onBlur={(e) => setPicUrl(e.target.value)}
          onChange={(e) => setPicUrl(e.target.value)}
          type="text"
          value={picUrl}
          placeholder="Profile picture URL"
        />
        <input
          onBlur={(e) => setEmail(e.target.value)}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Email"
        />
        <input
          onBlur={(e) => Setpassword(e.target.value)}
          onChange={(e) => Setpassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
        />
        <button type="submit" onClick={(e) => loginToApp(e)}>
          Sign In
        </button>
      </form>
      <p>
        {" "}
        Not a member ?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}
