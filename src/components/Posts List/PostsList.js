import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHttp } from "../../hooks/use-http";
import PostCard from "../Post Card/PostCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import Section from "../UI/Section";

import classes from "./PostsList.module.css";

const PostsList = (props) => {
  const navigate = useNavigate();

  const { URL } = props;

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

      let data;
      try {
        data = await sendRequest(`${URL}?${params.toString()}`);
        if (data) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
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
  }, [sendRequest, currentPostName, currentPage, currentCategory, URL]);

  if (posts === null || isLoading) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return (
      <div className={`${props.className} section-message`}>
        <i class="fa-solid fa-file-excel"></i>
        <h1>No posts where found.</h1>
      </div>
    );
  }

  const onChangePageHandler = (event, pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    navigate(window.location.pathname + "?" + currentUrlParams.toString());
  };

  return (
    <div className={`${props.className}`}>
      <h1 className="section-title">{props.title}</h1>
      <div className={classes["posts-list"]}>
        {posts.map((post) => {
          return (
            <PostCard
              id={post.id}
              key={post.id}
              title={post.title}
              creator={post.creator}
              image={post.image}
            />
          );
        })}
      </div>
      <div className="pagination-wrapper">
        {paginationData && (
          <Pagination
            className="pagination"
            count={paginationData.totalPages}
            page={paginationData.currentPage}
            onChange={onChangePageHandler}
          />
        )}
      </div>
    </div>
  );
};

export default PostsList;
