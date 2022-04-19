import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./PostCard.module.css";
import ProfileContext from "../../context/profile-context";
import { AuthContext } from "../../context/auth-context";

const PostCard = (props) => {
  const navigate = useNavigate();

  const profile = useContext(ProfileContext);
  const auth = useContext(AuthContext);

  const postRef = useRef();

  const style = {
    backgroundImage: `url(http://localhost:5000/${props.image})`,
  };

  const liked = profile.postIsLiked(props.id);

  const onPostClickHandler = (e) => {
    e.preventDefault();
    if (e.currentTarget !== postRef.current) return;
    const redirectLink = `/post/${props.id}`;
    return navigate(redirectLink);
  };

  const heartStyle = liked ? classes["post-card__like-btn--liked"] : "";

  const onLikeHandler = (e) => {
    e.preventDefault();
    if (liked) {
      profile.removeLike(props.id);
    } else {
      profile.addLike(props.id);
    }
  };

  return (
    <div className={classes["post-card"]} ref={postRef}>
      <div
        style={style}
        className={classes["post-card__child"]}
        onClick={onPostClickHandler}
      >
        {auth.isLoggedIn && (
          <i
            class={`fas fa-heart ${classes["post-card__like-btn"]} ${heartStyle}`}
            onClick={onLikeHandler}
          ></i>
        )}
        <h2 className={classes["post-card__creator"]}>
          {props.creator.nickname}
        </h2>
        <h1 className={classes["post-card__title"]}>{props.title}</h1>
      </div>
    </div>
  );
};

export default PostCard;
