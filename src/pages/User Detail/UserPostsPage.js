import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PostCard from "../../components/Post Card/PostCard";
import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";
import { useHttp } from "../../hooks/use-http";

const UserPostsPage = (props) => {
  const userNickname = useParams().uid;
  const [posts, setPostsList] = useState(null);
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const [paginationData, setPaginationData] = useState({
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    currentPage: 0,
  });

  // TODO: posible refactor con Home.
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
        setPaginationData({
          hasNext: data.hasNextPage,
          hasPrev: data.hasPreviousPage,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
        if (data) {
          setPostsList(data.posts);
        } else {
          setPostsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [
    userNickname,
    sendRequest,
    currentPage,
    currentCategory,
    currentPostName,
  ]);

  return (
    <Section className={props.className}>
      {posts === null && <LoadingSpinner />}
      {posts !== null && (
        <PostsList
          className={props.className}
          items={posts}
          title={`Posts by ${userNickname}`}
          paginationData={paginationData}
        />
      )}
    </Section>
  );
};

export default UserPostsPage;
