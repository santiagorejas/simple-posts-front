import { useContext, useEffect, useState } from "react";
import Modal from "../components/UI/Modal";
import { useHttp } from "../hooks/use-http";
import { AuthContext } from "./auth-context";
import ProfileContext from "./profile-context";

const LikesContextProvider = (props) => {
    const [nickname, setNickname] = useState();
    const [image, setImage] = useState();
    const [likes, setLikes] = useState([]);
    const [posts, setPosts] = useState([]);
    const { isLoading, error, clearError, sendRequest } = useHttp();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/user/profile/${auth.userId}`
                );

                setNickname(data.profile.nickname);
                setImage(data.profile.image);
                setLikes(data.profile.likes);
                setPosts(data.profile.posts);
            } catch (err) {}
        };

        if (auth.isLoggedIn && auth.userId !== null) {
            fetchProfileData();
        }
    }, [sendRequest, auth]);

    const addPostHandler = (post) => {
        setPosts((pre) => [...pre, post]);
    };

    const removePostHandler = (postId) => {
        setPosts((pre) => pre.filter((pid) => pid !== postId));
    };

    const addLikeHandler = async (postId) => {
        if (!auth.isLoggedIn) {
            return;
        }

        if (likes.includes(postId)) {
            return;
        }

        setLikes((prev) => [...prev, postId]);

        try {
            const data = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/post/like/${postId}`,
                "POST",
                JSON.stringify({
                    like: true,
                }),
                {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {
            setLikes((prev) => prev.filter((p) => p !== postId));
        }
    };

    const removeLikeHandler = async (postId) => {
        if (!auth.isLoggedIn) {
            return;
        }

        if (!likes.includes(postId)) {
            return;
        }

        setLikes((prev) => prev.filter((p) => p !== postId));

        try {
            const data = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/post/like/${postId}`,
                "POST",
                JSON.stringify({
                    like: false,
                }),
                {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {
            setLikes((prev) => [...prev, postId]);
        }
    };

    const postIsLikedHandler = (postId) => {
        return likes.includes(postId);
    };

    const setLikesHandler = (likedPosts) => {
        setLikes(likedPosts);
    };

    const updateProfileHandler = (newNickname, newImage) => {
        if (newNickname) setNickname(newNickname);
        if (newImage) setImage(newImage);
    };

    const clearProfileHandler = () => {
        setNickname("");
        setImage("");
        setLikes([]);
        setPosts([]);
    };

    return (
        <>
            {error && <Modal onClose={clearError}>{error}</Modal>}
            <ProfileContext.Provider
                value={{
                    nickname,
                    image,
                    posts,
                    addPost: addPostHandler,
                    removePost: removePostHandler,
                    likes,
                    addLike: addLikeHandler,
                    removeLike: removeLikeHandler,
                    setLikes: setLikesHandler,
                    postIsLiked: postIsLikedHandler,
                    clearProfile: clearProfileHandler,
                    updateProfile: updateProfileHandler,
                }}
            >
                {props.children}
            </ProfileContext.Provider>
        </>
    );
};

export default LikesContextProvider;
