import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubsciptionIcon from "@material-ui/icons/Subscriptions";
import InputOptions from "./inputOption";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { Post } from "./Post";
import { collection, query, onSnapshot } from "firebase/firestore";

import { firebaseApp } from "./firebase";
import { useState, useEffect } from "react";
import {
  addDoc,
  getFirestore,
  serverTimestamp,
  orderBy,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import FlipMove from "react-flip-move";
export default function Feed() {
  const user = getAuth(firebaseApp).currentUser;
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    readPosts();
    return () => {
      setPosts([]); // This worked for me
    };
  }, []);

  function readPosts() {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(
      collection(getFirestore(firebaseApp), "posts"),
      orderBy("timestamp", "desc")
    );

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }

  // Saves a new message to Cloud Firestore.
  async function sendPost(e) {
    e.preventDefault();
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), "posts"), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoURL || "",
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOption">
          <InputOptions Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOptions Icon={SubsciptionIcon} title="Video" color="#E7A33E" />
          <InputOptions Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
          return (
            <Post
              key={id}
              name={name}
              message={message}
              description={description}
              photoUrl={photoUrl}
            />
          );
        })}
      </FlipMove>
    </div>
  );
}
