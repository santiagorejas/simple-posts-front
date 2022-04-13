import PostCard from "../Post Card/PostCard";
import Section from "../UI/Section";

import classes from "./PostsList.module.css";

const PostsList = (props) => {
  if (props.items.length === 0) {
    return <h1>No items where found.</h1>;
  }

  console.log("adsasd " + props.items[0].creator.nickname);

  return (
    <Section className={`${props.className}`}>
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
    </Section>
  );
};

export default PostsList;
