import { Navigate, Route, Routes } from "react-router-dom";
import React, { useContext, Suspense } from "react";
import ThemeContext from "./context/theme-context";
import Section from "./components/UI/Section";

import Home from "./pages/Home/Home";
import ProfileCard from "./components/Profile Card/ProfileCard";
import Categories from "./components/Categories/Categories";
import SearchBar from "./components/Search Bar/SearchBar";
import NavBar from "./components/NavBar/NavBar";

import "./App.css";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Modal from "./components/UI/Modal";

const PostDetailPage = React.lazy(() =>
    import("./pages/Post Detail/PostDetailPage")
);
const LoginPage = React.lazy(() => import("./pages/Login/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/Signup/SignupPage"));
const CreatePostPage = React.lazy(() =>
    import("./pages/Create Post/CreatePostPage")
);
const UserPostsPage = React.lazy(() =>
    import("./pages/User Detail/UserPostsPage")
);
const NotFoundPage = React.lazy(() => import("./pages/Not Found/NotFoundPage"));
const LikedPostsPage = React.lazy(() =>
    import("./components/Liked Posts/LikedPostsPage")
);
const EditAccountPage = React.lazy(() =>
    import("./pages/Edit Account/EditAccountPage")
);
const EditPostPage = React.lazy(() => import("./pages/Edit Post/EditPostPage"));

function App() {
    const themeCtx = useContext(ThemeContext);

    return (
        <div
            className="app"
            data-theme={themeCtx.theme === "light" ? "" : "dark"}
        >
            <NavBar className="app" />
            <div className="grid-container">
                <SearchBar className="grid-container__search-bar" />
                <ProfileCard className="grid-container__profile-card" />
                <Categories className="grid-container__categories" />
                <Section className="grid-container__main-section">
                    <Suspense
                        fallback={
                            <div className="center">
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/post" replace />}
                            />
                            <Route path="/post" element={<Home />} />
                            <Route
                                path="/post/:pid"
                                element={<PostDetailPage />}
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route
                                path="/post/create"
                                element={<CreatePostPage />}
                            />
                            <Route
                                path="/user/:uid/likes"
                                element={<LikedPostsPage />}
                            />
                            <Route
                                path="/user/:uid"
                                element={<UserPostsPage />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                            <Route
                                path="/edit-account"
                                element={<EditAccountPage />}
                            />
                            <Route
                                path="/post/edit/:pid"
                                element={<EditPostPage />}
                            />
                        </Routes>
                    </Suspense>
                </Section>
            </div>
        </div>
    );
}

export default App;
