import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/use-http";

import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const { sendRequest, error, clearError, isLoading } = useHttp();

  useEffect(() => {
    const fetchPosts = async () => {
      const URL = "http://localhost:5000/api/post?page=1";

      const data = await sendRequest(URL);

      console.log("WWHGAT " + data.posts);

      setPosts(data.posts);
    };

    fetchPosts();
  }, [sendRequest]);

  return (
    <>
      {isLoading && (
        <Section className={props.className}>
          <LoadingSpinner />
        </Section>
      )}
      {!isLoading && <PostsList className={props.className} items={posts} />}
    </>
  );
};

export default Home;
