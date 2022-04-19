import { createContext } from "react";

const LikesContext = createContext({
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
});

export default LikesContext;
