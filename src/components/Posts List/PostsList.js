import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "../Post Card/PostCard";
import Section from "../UI/Section";

import classes from "./PostsList.module.css";

const PostsList = (props) => {
  const navigate = useNavigate();

  if (props.items.length === 0) {
    return (
      <Section className={`${props.className} section-message`}>
        <i class="fa-solid fa-file-excel"></i>
        <h1>No posts where found.</h1>
      </Section>
    );
  }

  const onChangePageHandler = (event, pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    navigate(window.location.pathname + "?" + currentUrlParams.toString());
  };

  const { paginationData } = props;

  return (
    <Section className={`${props.className}`}>
      <h1 className="section-title">{props.title}</h1>
      <div className={classes["posts-list"]}>
        {props.items.map((post) => {
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
            count={paginationData.totalPages}
            page={paginationData.currentPage}
            onChange={onChangePageHandler}
          />
        )}
      </div>
    </Section>
  );
};

export default PostsList;
