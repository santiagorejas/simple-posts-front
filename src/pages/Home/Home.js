import { useState, useEffect, useRef } from "react";
import { useHttp } from "../../hooks/use-http";

import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";
import { useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const { sendRequest, error, clearError, isLoading } = useHttp();

  const [searchParams] = useSearchParams();
  const postNameParam = searchParams.get("name");
  const previousPostNameParam = useRef(postNameParam);
  const [currentPage, setCurrentPage] = useState(searchParams.get("page"));

  useEffect(() => {
    const fetchPosts = async () => {
      const param = postNameParam ? `name=${postNameParam}` : "";

      const URL = `http://localhost:5000/api/post?page=${currentPage}&${param}`;

      const data = await sendRequest(URL);

      setPosts(data.posts);
      setPaginationData({
        hasNext: data.hasNextPage,
        hasPrev: data.hasPreviousPage,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    };

    if (previousPostNameParam.current !== postNameParam) {
      setCurrentPage(1);
      previousPostNameParam.current = postNameParam;
    }
    fetchPosts();
  }, [sendRequest, postNameParam, currentPage]);

  const onPageChangeHandler = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const sectionTitle = postNameParam
    ? `Results for '${postNameParam}'`
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
