import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import ProfileContext from "../../context/profile-context";
import CommentsContainer from "./CommentsContainer";

import classes from "./PostDetail.module.css";

const PostDetail = (props) => {
    const { title, image, description, creator } = props;
    const profile = useContext(ProfileContext);
    const auth = useContext(AuthContext);
    const liked = profile.postIsLiked(props.postId);

    const heartStyle = liked ? { color: "red" } : {};

    const navigate = useNavigate();

    const onLikeHandler = (e) => {
        e.preventDefault();
        if (liked) {
            profile.removeLike(props.postId);
        } else {
            profile.addLike(props.postId);
        }
    };

    return (
        <div className={`${props.className} ${classes["post-detail"]}`}>
            <div className={classes["post-detail__header"]}>
                <h1 className={classes["header__title"]}>{title}</h1>
                <div
                    className={classes["header__author"]}
                    onClick={() => navigate(`/user/${creator.nickname}`)}
                >
                    <img
                        alt={creator.nickname}
                        src={`${process.env.REACT_APP_BACKEND_URL}api${creator.image}`}
                    />
                    <h2>{creator.nickname}</h2>
                </div>
            </div>
            <div className={classes["post-detail__image-wrapper"]}>
                <a
                    href={`${process.env.REACT_APP_BACKEND_URL}api${image}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className={classes["post-detail__image"]}
                        src={`${process.env.REACT_APP_BACKEND_URL}api${image}`}
                        alt={title}
                    />
                </a>
            </div>
            {auth.isLoggedIn && (
                <div className={classes["post-detail__btns"]}>
                    <button
                        className={classes["post-detail__btn"]}
                        style={heartStyle}
                        onClick={onLikeHandler}
                    >
                        <i class="fa-solid fa-heart"></i>
                        <span>Like</span>
                    </button>
                    {profile.nickname === creator.nickname && (
                        <button
                            className={classes["post-detail__btn"]}
                            onClick={() =>
                                navigate(`/post/edit/${props.postId}`)
                            }
                        >
                            <i class="fa-solid fa-pen"></i>
                            <span>Edit</span>
                        </button>
                    )}
                </div>
            )}
            <p className={classes["post-detail__description"]}>{description}</p>
            <CommentsContainer postId={props.postId} />
        </div>
    );
};

export default PostDetail;
