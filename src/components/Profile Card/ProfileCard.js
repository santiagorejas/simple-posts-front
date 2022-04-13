import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";
import Section from "../UI/Section";

import classes from "./ProfileCard.module.css";

const ProfileCard = (props) => {
  const [profileData, setProfileData] = useState(null);

  const { isLoggedIn, token } = useContext(AuthContext);

  const { isLoading, error, clearError, sendRequest } = useHttp();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await sendRequest(
        `http://localhost:5000/api/user/profile`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(JSON.stringify(data.profile));
      setProfileData(data.profile);
    };

    if (isLoggedIn) fetchProfile();
  }, [sendRequest, isLoggedIn]);

  if (!isLoggedIn) {
    return <Section className={props.className}>Not logged in</Section>;
  }

  if (!isLoading && profileData !== null)
    return (
      <Section className={props.className}>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          isLoggedIn &&
          (profileData !== "undefined" || profileData !== null) && (
            <div className={classes["profile-card"]}>
              <img
                className={classes["profile-card__image"]}
                src={`http://localhost:5000/${profileData.image}`}
                alt={profileData.nickname}
              />
              <h2 className={classes["profile-card__nickname"]}>
                {profileData.nickname}
              </h2>
              <div className={classes["profile-card__counters-container"]}>
                <div className={classes["profile-card__counters"]}>
                  <h3>Posts</h3>
                  <p>{profileData.numberOfPosts}</p>
                </div>
                <div className={classes["profile-card__counters"]}>
                  <h3>Likes</h3>
                  <p>{profileData.numberOfLikes}</p>
                </div>
              </div>
            </div>
          )}
      </Section>
    );

  return <p>dsaasdsad</p>;
};

export default ProfileCard;
