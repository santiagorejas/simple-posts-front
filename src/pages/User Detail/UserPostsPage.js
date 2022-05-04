import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PostCard from "../../components/Post Card/PostCard";
import PostsList from "../../components/Posts List/PostsList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Section from "../../components/UI/Section";
import { useHttp } from "../../hooks/use-http";

const UserPostsPage = (props) => {
  const userNickname = useParams().uid;

  const URL = `http://localhost:5000/api/post/user/${userNickname}`;

  return (
    <>
      <PostsList
        className={props.className}
        title={`Posts by ${userNickname}`}
        URL={URL}
      />
    </>
  );
};

export default UserPostsPage;
