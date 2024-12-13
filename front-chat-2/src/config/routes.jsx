// import React from 'react'
import { Route } from 'react-router';
import { Routes } from 'react-router';
import ChatPage from "../components/ChatPage";
import App from "../App.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path={"/about"} element={<h1>This is about page</h1>}/>
        <Route path={"*"}  element={<h1>Not Found</h1> }/>
    </Routes>
  );
}

export default AppRoutes;
