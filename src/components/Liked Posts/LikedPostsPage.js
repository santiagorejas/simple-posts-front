import { useParams } from "react-router-dom";
import PostsList from "../Posts List/PostsList";

const LikedPostsPage = (props) => {
  const userNickname = useParams().uid;

  const sectionTitle = `Posts liked by ${userNickname}.`;

  const URL = `http://localhost:5000/api/user/likes/${userNickname}`;

  return (
    <>
      <PostsList className={props.className} title={sectionTitle} URL={URL} />
    </>
  );
};

export default LikedPostsPage;