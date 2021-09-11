import { getAuth } from "@firebase/auth";
import { Avatar } from "@material-ui/core";
import { firebaseApp } from "./firebase";
import "./Sidebar.css";
export default function Sidebar() {
  const u = getAuth(firebaseApp).currentUser;
  const recentItem = (topic) => {
    return (
      <div className="sideBar__recentItem">
        <span className="sideBar__hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/178/804/original/retro-vintage-80s-gradient-neon-color-background-vector.jpg"
          alt=""
        />
        <Avatar src={u?.photoURL} className="sidebar__avatar">
          {u?.displayName[0]}
        </Avatar>
        <h2>{u?.displayName}</h2>
        <h4>{u?.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p> Who viewed you</p>
          <p className="sidebar__statNumber">25552</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on posts</p>
          <p className="sidebar__statNumber">5525</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("development")}
        {recentItem("fitness")}
        {recentItem("programming")}
        {recentItem("sex")}
      </div>
    </div>
  );
}
