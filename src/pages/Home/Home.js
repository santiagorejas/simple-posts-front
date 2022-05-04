import PostsList from "../../components/Posts List/PostsList";
import { useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [searchParams] = useSearchParams();
  const currentPostName = searchParams.get("name");

  const URL = `http://localhost:5000/api/post`;

  const sectionTitle = currentPostName
    ? `Results for '${currentPostName}'`
    : "Latest posts";

  return (
    <>
      <PostsList className={props.className} title={sectionTitle} URL={URL} />
    </>
  );
};

export default Home;
