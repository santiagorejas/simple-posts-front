import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "../Post Card/PostCard";
import Section from "../UI/Section";

import classes from "./PostsList.module.css";

const PostsList = (props) => {
  const navigate = useNavigate();

  if (props.items.length === 0) {
    return <h1>No items where found.</h1>;
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
      <div className={classes["posts-list__pagination-wrapper"]}>
        {paginationData && (
          <Pagination
            count={paginationData.totalPages}
            page={paginationData.currentPage}
            //onChange={props.onPageChange}
            onChange={onChangePageHandler}
          />
        )}
      </div>
    </Section>
  );
};

export default PostsList;
