import { useNavigate } from "react-router-dom";
import Section from "../UI/Section";
import Comment from "./Comment";
import NewComment from "./NewComment";

import classes from "./PostDetail.module.css";

const PostDetail = (props) => {
  const { title, image, description, comments, creator } = props;

  const navigate = useNavigate();

  return (
    <Section className={`${props.className} ${classes["post-detail"]}`}>
      <div className={classes["post-detail__header"]}>
        <h1 className={classes["header__title"]}>{title}</h1>
        <div
          className={classes["header__author"]}
          onClick={() => navigate(`/user/${creator._id}`)}
        >
          <img
            alt={creator.nickname}
            src={`http://localhost:5000/${creator.image}`}
          />
          <h2>{creator.nickname}</h2>
        </div>
      </div>
      <img
        className={classes["post-detail__image"]}
        src={`http://localhost:5000/${image}`}
        alt={title}
      />
      <p className={classes["post-detail__description"]}>{description}</p>
      <h1 className={classes["post-detail__comments-section-title"]}>
        Comments Section
      </h1>
      <div className={classes["post-detail__comments-section"]}>
        {comments.map((comment) => (
          <Comment
            author={comment.author.nickname}
            content={comment.content}
            date={comment.date}
            image={comment.author.image}
          />
        ))}
        <NewComment />
      </div>
    </Section>
  );
};

export default PostDetail;
