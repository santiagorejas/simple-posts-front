import { useParams } from "react-router-dom";
import PostsList from "../../components/Posts List/PostsList";

const UserPostsPage = (props) => {
  const userNickname = useParams().uid;

  const URL = `http://localhost:5000/api/post/user/${userNickname}`;

  return (
    <>
      <PostsList
        className={props.className}
        title={`Posts by ${userNickname}`}
        URL={URL}
      />
    </>
  );
};

export default UserPostsPage;
