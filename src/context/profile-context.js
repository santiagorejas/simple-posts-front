import { createContext } from "react";

const ProfileContext = createContext({
    nickname: "",
    image: "",
    posts: [],
    addPost: (post) => {},
    removePost: (postId) => {},
    likes: [],
    addLike: (postId) => {},
    removeLike: (postId) => {},
    setLikes: (likes) => {},
    postIsLiked: (postId) => {},
    clearProfile: () => {},
    updateProfile: (nickname, image) => {},
});

export default ProfileContext;
