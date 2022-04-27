import { useContext } from "react";
import classes from "./Comment.module.css";
import ProfileContext from "../../context/profile-context";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";

const Comment = (props) => {
  const { author, content, image, onRemoveComment, date } = props;
  const dateObject = new Date(date);
  const dateFormated = dateObject.toLocaleDateString("en-US");
  const time =
    dateObject.getHours() +
    ":" +
    dateObject.getMinutes() +
    ":" +
    dateObject.getSeconds();
  const profileCtx = useContext(ProfileContext);
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

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
      <div className={classes["comment__image-wrapper"]}>
        <img
          className={classes["comment__image"]}
          src={`http://localhost:5000/${image}`}
          alt={author}
          onClick={() => navigate(`/user/${author}`)}
        />
      </div>
      <div className={classes["comment__text-container"]}>
        <div>
          <h2
            className={classes["comment__author-nickname"]}
            onClick={() => navigate(`/user/${author}`)}
          >
            {author}
          </h2>
          -
          <h2
            className={classes["comment__date"]}
          >{`${dateFormated} | ${time}`}</h2>
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
