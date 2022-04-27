import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHttp } from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import Comment from "./Comment";
import classes from "./CommentsContainer.module.css";
import NewComment from "./NewComment";

const CommentsContainer = (props) => {
  const [comments, setComments] = useState([]);
  const [paginationData, setPaginationData] = useState({
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    currentPage: 0,
  });
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { postId } = props;
  const [searchParams] = useSearchParams();
  const currentCommentsPage = +searchParams.get("commentsPage");

  const onNewCommentHandler = (newComment) => {
    if (currentCommentsPage === 1 || currentCommentsPage === 0)
      setComments((prev) => (prev = [newComment, ...prev]));
  };

  const onRemoveCommentHandler = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  useEffect(() => {
    const fetchComments = async () => {
      const params = new URLSearchParams();
      if (currentCommentsPage) params.set("page", currentCommentsPage);

      const URL = `http://localhost:5000/api/comment/${postId}?${params.toString()}`;

      try {
        const data = await sendRequest(URL);

        setComments(data.comments);
        setPaginationData({
          hasNext: data.hasNextPage,
          hasPrev: data.hasPreviousPage,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
      } catch (err) {}
    };

    fetchComments();
  }, [postId, sendRequest, currentCommentsPage]);

  const navigate = useNavigate();

  const onChangePageHandler = (event, pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("commentsPage", pageNumber);
    navigate(window.location.pathname + "?" + currentUrlParams.toString());
  };

  return (
    <>
      <h1 className={classes["comments-container__comments-section-title"]}>
        Comments Section
      </h1>
      <div className={classes["comments-container__comments-section"]}>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          comments.map((comment) => (
            <Comment
              id={comment.id}
              key={comment.id}
              author={comment.author.nickname}
              content={comment.content}
              date={comment.date}
              image={comment.author.image}
              onRemoveComment={onRemoveCommentHandler}
            />
          ))}
        <div className="pagination-wrapper">
          {paginationData && (
            <Pagination
              count={paginationData.totalPages}
              page={paginationData.currentPage}
              onChange={onChangePageHandler}
            />
          )}
        </div>
        <NewComment postId={props.postId} onNewComment={onNewCommentHandler} />
      </div>
    </>
  );
};

export default CommentsContainer;
