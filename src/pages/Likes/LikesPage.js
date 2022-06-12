import PostsList from "../../components/Posts List/PostsList";
import { useContext } from "react";
import ProfileContext from "../../context/profile-context";
import { useParams } from "react-router-dom";

const LikesPage = (props) => {
    const nickname = useParams().nickname;

    const URL = `${process.env.REACT_APP_BACKEND_URL}api/user/likes/${nickname}`;
    console.log(URL);

    const sectionTitle = `Posts liked by '${nickname}'`;

    return (
        <>
            <PostsList
                className={props.className}
                title={sectionTitle}
                URL={URL}
            />
        </>
    );
};

export default LikesPage;
