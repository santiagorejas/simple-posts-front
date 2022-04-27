import { useState, useEffect, useRef } from "react";
import { useHttp } from "../../hooks/use-http";

import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [posts, setPosts] = useState(null);
  const [paginationData, setPaginationData] = useState({
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    currentPage: 0,
  });
  const { sendRequest, error, clearError, isLoading } = useHttp();

  const [searchParams] = useSearchParams();
  const currentPostName = searchParams.get("name");
  const currentPage = searchParams.get("page");
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams();

      if (currentPage) params.set("page", currentPage);
      if (currentCategory) params.set("category", currentCategory);
      if (currentPostName) params.set("name", currentPostName);

      const URL = `http://localhost:5000/api/post?${params.toString()}`;

      let data;
      try {
        data = await sendRequest(URL);
        setPosts(data.posts);
        setPaginationData({
          hasNext: data.hasNextPage,
          hasPrev: data.hasPreviousPage,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [sendRequest, currentPostName, currentPage, currentCategory]);

  const sectionTitle = currentPostName
    ? `Results for '${currentPostName}'`
    : "Latest posts";

  return (
    <>
      {(posts === null || isLoading) && (
        <Section className={props.className}>
          <LoadingSpinner />
        </Section>
      )}
      {posts !== null && !isLoading && (
        <>
          <PostsList
            className={props.className}
            items={posts}
            title={sectionTitle}
            paginationData={paginationData}
          />
        </>
      )}
    </>
  );
};

export default Home;
