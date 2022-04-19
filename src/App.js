import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import ProfileCard from "./components/Profile Card/ProfileCard";
import Categories from "./components/Categories/Categories";
import SearchBar from "./components/Search Bar/SearchBar";
import NavBar from "./components/NavBar/NavBar";
import PostDetailPage from "./pages/Post Detail/PostDetailPage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import CreatePostPage from "./pages/Create Post/CreatePostPage";

function App() {
  return (
    <>
      <NavBar />
      <div className="grid-container">
        <SearchBar className="grid-container__search-bar" />
        <ProfileCard className="grid-container__profile-card" />
        <Categories className="grid-container__categories" />
        <Routes>
          <Route path="/" element={<Navigate to="/post" replace />} />
          <Route
            path="/post"
            element={<Home className="grid-container__main-section" />}
          />
          <Route
            path="/post/:pid"
            element={
              <PostDetailPage className="grid-container__main-section" />
            }
          />
          <Route
            path="/login"
            element={<LoginPage className="grid-container__main-section" />}
          />
          <Route
            path="/signup"
            element={<SignupPage className="grid-container__main-section" />}
          />
          <Route
            path="/post/create"
            element={
              <CreatePostPage className="grid-container__main-section" />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
