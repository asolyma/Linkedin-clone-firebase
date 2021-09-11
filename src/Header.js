import "./Header.css";
import logo from "./linkedin.svg";
import SearchIcon from "@material-ui/icons/Search";
import HeaderOptions from "./HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { BusinessCenter, Chat, Notifications } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import logout from "./features/userSlice";
import { getAuth } from "@firebase/auth";
import { firebaseApp } from "./firebase";
const Header = () => {
  const dispatch = useDispatch();

  const logoutFromApp = () => {
    const auth = getAuth(firebaseApp);
    dispatch(logout);
    auth.signOut();
  };
  return (
    <div className="header">
      <div className="header__left">
        <img src={logo} alt=" Linkedin" />
        <div className="header__search">
          <SearchIcon />
          <input placeholder="search" type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOptions Icon={HomeIcon} title="Home" />
        <HeaderOptions Icon={SupervisorAccountIcon} title="Jobs" />
        <HeaderOptions Icon={BusinessCenter} title="My Network" />
        <HeaderOptions Icon={Chat} title="Messaging" />
        <HeaderOptions Icon={Notifications} title="Notifications" />
        <HeaderOptions avatar={true} title="Me" onClick={logoutFromApp} />
      </div>
    </div>
  );
};
export default Header;
