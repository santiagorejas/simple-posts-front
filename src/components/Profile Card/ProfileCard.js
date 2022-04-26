import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";
import ProfileContext from "../../context/profile-context";
import Section from "../UI/Section";

import classes from "./ProfileCard.module.css";

const ProfileCard = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const profile = useContext(ProfileContext);

  if (!isLoggedIn) {
    return (
      <Section className={props.className}>
        <div className={classes["profile-card__not-logged-in"]}>
          <h1>Not logged in</h1>
          <Button
            className="form-btn"
            variant="contained"
            type="submit"
            margin="normal"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="form-btn"
            variant="contained"
            type="submit"
            margin="normal"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </div>
      </Section>
    );
  }

  if (!isLoading && profile !== null)
    return (
      <Section className={props.className}>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          isLoggedIn &&
          (profile !== "undefined" || profile !== null) && (
            <div className={classes["profile-card"]}>
              <img
                className={classes["profile-card__image"]}
                src={`http://localhost:5000/${profile.image}`}
                alt={profile.nickname}
                onClick={() => navigate(`/user/${profile.nickname}`)}
              />
              <h2 className={classes["profile-card__nickname"]}>
                {profile.nickname}
              </h2>
              <div className={classes["profile-card__counters-container"]}>
                <div className={classes["profile-card__counters"]}>
                  <h3>Posts</h3>
                  <p>{profile.posts.length}</p>
                </div>
                <div className={classes["profile-card__counters"]}>
                  <h3>Likes</h3>
                  <p>{profile.likes.length}</p>
                </div>
              </div>
            </div>
          )}
      </Section>
    );

  return <p>dsaasdsad</p>;
};

export default ProfileCard;
