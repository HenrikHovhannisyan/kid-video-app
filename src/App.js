import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Компоненты
import Header from "./components/header/Header";

// Страницы
import HomePage from "./pages/home/HomePage";
import VideoPage from "./pages/video/VideoPage";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SingIn";
import ProtectedUserInfo from "./components/common/ProtectedUserInfo/ProtectedUserInfo";

// Стили
import "./App.css";
import "./assets/styles/forms.css";
import "./assets/styles/buttons.css";

/**
 * Главный компонент приложения
 * Содержит маршрутизацию и основную структуру приложения
 * @returns {React.ReactElement} Компонент App
 */
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user-info" element={<ProtectedUserInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
