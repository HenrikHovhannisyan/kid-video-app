import React from "react";
import "./App.css";
import "./assets/styles/forms.css";
import "./assets/styles/buttons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import VideoPage from "./pages/video/VideoPage";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SingIn";
import AuthDetails from "./components/auth/AuthDetails";
import AddVideo from "./components/videos/AddVideo";
import Header from "./components/header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user-info" element={<AuthDetails />} />
        <Route path="/add-video" element={<AddVideo />} />
      </Routes>
    </Router>
  );
};

export default App;
