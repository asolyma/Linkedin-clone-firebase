import { getAuth } from "@firebase/auth";
import { Avatar } from "@material-ui/core";
import { firebaseApp } from "./firebase";
import "./HeaderOptions.css";
export default function HeaderOptions({ avatar, Icon, title, onClick }) {
  const user = getAuth(firebaseApp).currentUser;
  return (
    <div onClick={onClick} className="headerOption">
      {Icon ? <Icon className="headerOption__icon" /> : ""}
      {avatar ? (
        <Avatar className="headerOption__icon" src={user?.photoURL}>
          {user?.displayName[0]}
        </Avatar>
      ) : (
        ""
      )}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}
