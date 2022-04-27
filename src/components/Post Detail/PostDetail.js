import { useNavigate } from "react-router-dom";
import Section from "../UI/Section";
import CommentsContainer from "./CommentsContainer";

import classes from "./PostDetail.module.css";

const PostDetail = (props) => {
  const { title, image, description, creator } = props;

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
      <div className={classes["post-detail__image-wrapper"]}>
        <img
          className={classes["post-detail__image"]}
          src={`http://localhost:5000/${image}`}
          alt={title}
        />
      </div>
      <p className={classes["post-detail__description"]}>{description}</p>
      <CommentsContainer postId={props.postId} />
    </Section>
  );
};

export default PostDetail;
