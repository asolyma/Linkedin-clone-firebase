import { Avatar } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import InputOptions from "./inputOption";
import "./Post.css";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { forwardRef } from "react";
export const Post = forwardRef(
  ({ name, description, message, photoUrl }, ref) => {
    return (
      <div ref={ref} className="post">
        <div className="post__header">
          <Avatar src={photoUrl || ""}>{name[0]}</Avatar>
          <div className="post__info">
            <h2>{name}</h2>
            <p> {description}</p>
          </div>
        </div>
        <div className="post__body">
          <p>{message}</p>
        </div>

        <div className="post__buttons">
          <InputOptions
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="gray"
          />
          <InputOptions Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOptions Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOptions Icon={SendOutlinedIcon} title="send" color="gray" />
        </div>
      </div>
    );
  }
);