import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import CategoryPages from "./category/categotyPages/CategoryPages";
import { TaskProvider } from "./Context/Context";

const App = () => {
  return (
    <TaskProvider>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/category" element={<CategoryPages />} />
        </Routes>
      </div>
    </TaskProvider>
  );
};

export default App;
