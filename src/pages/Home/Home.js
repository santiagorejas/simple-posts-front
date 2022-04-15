import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/use-http";

import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";
import { useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const { sendRequest, error, clearError, isLoading } = useHttp();

  const [searchParams] = useSearchParams();
  const postNameParam = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const param = postNameParam ? `&name=${postNameParam}` : "";

      const URL = "http://localhost:5000/api/post?page=1" + param;
      console.log("URL: " + URL);

      const data = await sendRequest(URL);

      console.log("WWHGAT " + data.posts);

      setPosts(data.posts);
    };

    fetchPosts();
  }, [sendRequest, postNameParam]);

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
