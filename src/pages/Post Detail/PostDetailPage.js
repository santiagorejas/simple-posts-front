import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/use-http";
import PostDetail from "../../components/Post Detail/PostDetail";
import ProfileContext from "../../context/profile-context";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Modal from "../../components/UI/Modal";

const PostDetailPage = (props) => {
    const { nickname } = useContext(ProfileContext);
    const postId = useParams().pid;
    const [postDetail, setPostDetail] = useState(null);
    const [comments, setComments] = useState([]);

    const { isLoading, error, clearError, sendRequest } = useHttp();

    useEffect(() => {
        const fetchPost = async () => {
            let data;
            try {
                data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/post/${postId}`
                );
            } catch (err) {}

            if (data) setPostDetail(data.post);
            console.log(data);
        };

        fetchPost();
    }, [sendRequest, postId, nickname]);

    const onNewCommentHandler = (newComment) => {
        setComments((prev) => (prev = [...prev, newComment]));
    };

    return (
        <>
            {error && <Modal onClose={clearError}>{error}</Modal>}
            {(postDetail === null || isLoading) && (
                <div className={props.className}>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && postDetail !== null && (
                <PostDetail
                    postId={postId}
                    className={props.className}
                    title={postDetail.title}
                    image={postDetail.image}
                    description={postDetail.description}
                    creator={postDetail.creator}
                    onNewComment={onNewCommentHandler}
                />
            )}
        </>
    );
};

export default PostDetailPage;
