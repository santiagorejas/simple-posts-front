import { useNavigate } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";

import classes from "./PostDetail.module.css";

const PostDetail = (props) => {
  const { title, image, description, creator } = props;

  const navigate = useNavigate();

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
            src={`http://localhost:5000/api${creator.image}`}
          />
          <h2>{creator.nickname}</h2>
        </div>
      </div>
      <div className={classes["post-detail__image-wrapper"]}>
        <a
          href={`http://localhost:5000/api${image}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={classes["post-detail__image"]}
            src={`http://localhost:5000/api${image}`}
            alt={title}
          />
        </a>
      </div>
      <p className={classes["post-detail__description"]}>{description}</p>
      <CommentsContainer postId={props.postId} />
    </div>
  );
};

export default PostDetail;
