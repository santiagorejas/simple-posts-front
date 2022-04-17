import { useState, useEffect, useRef } from "react";
import { useHttp } from "../../hooks/use-http";

import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const { sendRequest, error, clearError, isLoading } = useHttp();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPostName = searchParams.get("name");
  const currentPage = searchParams.get("page");
  const currentCategory = searchParams.get("category");
  const previousPostName = useRef(currentPostName);
  const previousCategory = useRef(currentCategory);

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams();

      if (currentCategory) params.set("category", currentCategory);
      if (currentPostName) params.set("name", currentPostName);

      const URL = `http://localhost:5000/api/post?${params.toString()}`;

      const data = await sendRequest(URL);

      setPosts(data.posts);
      setPaginationData({
        hasNext: data.hasNextPage,
        hasPrev: data.hasPreviousPage,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    };

    if (
      previousCategory.current !== currentCategory ||
      previousPostName.current !== currentPostName
    ) {
      previousCategory.current = currentCategory;
      previousPostName.current = currentPostName;
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("page", 1);
      navigate(window.location.pathname + "?" + currentUrlParams.toString());
    }
    fetchPosts();
  }, [sendRequest, currentPostName, currentPage, currentCategory, navigate]);

  const onPageChangeHandler = (event, newPage) => {};

  const sectionTitle = currentPostName
    ? `Results for '${currentPostName}'`
    : "Latest posts";

  return (
    <>
      {isLoading && (
        <Section className={props.className}>
          <LoadingSpinner />
        </Section>
      )}
      {!isLoading && (
        <>
          <PostsList
            className={props.className}
            items={posts}
            title={sectionTitle}
            paginationData={paginationData}
            onPageChange={onPageChangeHandler}
          />
        </>
      )}
    </>
  );
};

export default Home;
