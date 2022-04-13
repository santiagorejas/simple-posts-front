import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/use-http";
import PostDetail from "../../components/Post Detail/PostDetail";

const PostDetailPage = (props) => {
  const postId = useParams().pid;

  const [postDetail, setPostDetail] = useState(null);

  const { isLoading, error, clearError, sendRequest } = useHttp();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await sendRequest(
        `http://localhost:5000/api/post/${postId}`
      );

      setPostDetail(data.post);
      console.log(data.post.title);
    };

    fetchPost();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && postDetail !== null && (
        <PostDetail
          className={props.className}
          title={postDetail.title}
          image={postDetail.image}
          description={postDetail.description}
          comments={postDetail.comments}
          creator={postDetail.creator}
        />
      )}
    </>
  );
};

export default PostDetailPage;
