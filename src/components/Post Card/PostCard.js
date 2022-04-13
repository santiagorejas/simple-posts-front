import { useNavigate } from "react-router-dom";
import classes from "./PostCard.module.css";

const PostCard = (props) => {
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url(http://localhost:5000/${props.image})`,
  };

  const onPostClickHandler = () => {
    const redirectLink = `/post/${props.id}`;
    return navigate(redirectLink);
  };

  return (
    <div className={classes["post-card"]} onClick={onPostClickHandler}>
      <div style={style} className={classes["post-card__child"]}>
        <i
          class={`fas fa-heart ${classes["post-card__like-btn"]}`}
          onClick={() => console.log("Hola mundo")}
        ></i>
        <h2 className={classes["post-card__creator"]}>
          {props.creator.nickname}
        </h2>
        <h1 className={classes["post-card__title"]}>{props.title}</h1>
      </div>
    </div>
  );
};

export default PostCard;
