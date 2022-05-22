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

    const liked = profile.postIsLiked(props.id);

    const onPostClickHandler = (e) => {
        e.preventDefault();
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
            <img
                src={`${process.env.REACT_APP_BACKEND_URL}api${props.image}`}
                alt={props.title}
                className={classes["post-card__image"]}
                onClick={onPostClickHandler}
            ></img>
            {auth.isLoggedIn && (
                <i
                    className={`fas fa-heart ${classes["post-card__like-btn"]} ${heartStyle} ${classes["post-card__element"]}`}
                    onClick={onLikeHandler}
                ></i>
            )}
            <h2
                className={`${classes["post-card__creator"]} ${classes["post-card__element"]}`}
                onClick={() => navigate(`/user/${props.creator.nickname}`)}
            >
                {props.creator.nickname}
            </h2>
            <h1
                className={`${classes["post-card__title"]} ${classes["post-card__element"]}`}
            >
                {props.title}
            </h1>
        </div>
    );
};

export default PostCard;
