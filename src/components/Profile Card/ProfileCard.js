import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";
import ProfileContext from "../../context/profile-context";
import Section from "../UI/Section";

import classes from "./ProfileCard.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const ProfileCard = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn, token } = useContext(AuthContext);
    const { isLoading, error, clearError, sendRequest } = useHttp();
    const profile = useContext(ProfileContext);
    const auth = useContext(AuthContext);

    if (!isLoggedIn) {
        return (
            <Section
                className={props.className}
                style={{ order: "-1", padding: "1rem" }}
            >
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

    const goToUserDetails = () => navigate(`/user/${profile.nickname}`);

    return (
        <Section
            className={props.className}
            style={{ order: "-1", padding: "1rem" }}
        >
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
                isLoggedIn &&
                (profile !== "undefined" || profile !== null) && (
                    <div className={classes["profile-card"]}>
                        <div className={classes["profile-card__main-info"]}>
                            <img
                                className={classes["profile-card__image"]}
                                src={`http://localhost:5000/api${profile.image}`}
                                alt={profile.nickname}
                                onClick={goToUserDetails}
                            />
                            <h2
                                className={classes["profile-card__nickname"]}
                                onClick={goToUserDetails}
                            >
                                {profile.nickname}
                            </h2>

                            <div
                                className={
                                    classes["profile-card__account-btns"]
                                }
                            >
                                <button
                                    className={
                                        classes[
                                            "profile-card__edit-account-btn"
                                        ]
                                    }
                                    onClick={() => navigate("/edit-account")}
                                >
                                    <i class="fa-solid fa-gear"></i>
                                    <p>Edit Account</p>
                                </button>
                                <button
                                    className={
                                        classes[
                                            "profile-card__edit-account-btn"
                                        ]
                                    }
                                    onClick={() => {
                                        auth.logout();
                                        profile.clearProfile();
                                    }}
                                >
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <p>Log Out</p>
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                classes["profile-card__counters-container"]
                            }
                        >
                            <div
                                className={classes["profile-card__counters"]}
                                onClick={goToUserDetails}
                            >
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
};

export default ProfileCard;
