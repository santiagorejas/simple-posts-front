import classes from "./Comment.module.css";

const Comment = (props) => {
  const { author, content, image } = props;
  const date = new Date(props.date).toLocaleDateString("en-US");

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
        </div>
        <p className={classes["comment__content"]}>{content}</p>
      </div>
    </li>
  );
};

export default Comment;
