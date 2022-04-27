import { useContext } from "react";
import classes from "./Comment.module.css";
import ProfileContext from "../../context/profile-context";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";

const Comment = (props) => {
  const { author, content, image, onRemoveComment } = props;
  const date = new Date(props.date).toLocaleDateString("en-US");
  const profileCtx = useContext(ProfileContext);
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const auth = useContext(AuthContext);

  const onDeleteCommentHandler = async (e) => {
    e.preventDefault();
    onRemoveComment(props.id);

    try {
      const data = await sendRequest(
        `http://localhost:5000/api/comment/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (err) {}
  };

  return (
    <li className={classes["comment"]}>
      <img
        className={classes["comment__image"]}
        src={`http://localhost:5000/${image}`}
        alt={author}
      />
      <div className={classes["comment__text-container"]}>
        <div>
          <h2 className={classes["comment__author-nickname"]}>{author}</h2>-
          <h2 className={classes["comment__date"]}>{date}</h2>
          {profileCtx.nickname === author && (
            <i
              className={`fa-solid fa-trash ${classes["comment__delete-btn"]}`}
              onClick={onDeleteCommentHandler}
            ></i>
          )}
        </div>
        <p className={classes["comment__content"]}>{content}</p>
      </div>
    </li>
  );
};

export default Comment;
