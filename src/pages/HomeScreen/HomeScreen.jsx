import React, { useContext, useState, useEffect } from "react";
import "./HomeScreen.css";
import { categories } from "../../Assets/assets";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../Context/Context";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { tasks, addTask } = useContext(TaskContext);
  const [visibletask, setVisibleTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Ensure categories are available
  useEffect(() => {
    console.log("Categories:", categories);
  }, []);

  const uniqueCategories = [...new Set(tasks.map((task) => task.category))];

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].title);
    }
  }, [categories]);

  useEffect(() => {
    console.log("Unique Categories:", uniqueCategories);
  }, [uniqueCategories]);

  const imageClick = (category) => {
    navigate("/category", { state: category });
  };

  const nextpage = () => {
    navigate("/category");
  };

  const toggleAdd = () => {
    setVisibleTask(!visibletask);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: tasks.length + 1,
      task: newTask,
      category: selectedCategory,
      completed: false,
    };

    addTask(newTaskObj);
    setNewTask("");
    setVisibleTask(false);
    console.log("New Task Added:", newTaskObj);
  };

  return (
    <div className="screen-backdrop">
      <div className={`screen-container ${visibletask ? "blur" : ""}`}>
        <div className="menu-button" onClick={nextpage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </div>

        <div className="welcome">
          <div className="content">
            <h1>Hello User</h1>
            <p>Today you have {tasks.length} tasks</p>
          </div>
          <div className="image" style={{ cursor: "pointer" }}>
            <div className="backdrop">
              <img src={categories[0].img} alt="boy" />
            </div>
          </div>
        </div>

        <div className="categories-wrapper">
          {categories.map((category, index) => (
            <div
              className="categories"
              key={index}
              onClick={() => imageClick(category)}
            >
              <div className="category">
                <div className="left">
                  <img src={category.img} alt={category.title} />
                  <h1>{category.title}</h1>
                  <p>
                    {
                      tasks.filter((task) => task.category === category.title)
                        .length
                    }{" "}
                    tasks
                  </p>
                </div>
                <div className="options">
                  <div className="toggle-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={toggleAdd}
        className={`add-task-bt ${visibletask ? "active-task" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      {visibletask && (
        <>
          <div className="black-backdrops visible"></div>
          <div className="add-tasks">
            <div className="add-task-backdrops"></div>
            <h1 className="headings">Add Task</h1>
            <div className="input-groups">
              <label htmlFor="task-inputs">Task</label>
              <input
                type="text"
                id="task-inputs"
                required
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="input-groups">
              <label htmlFor="category-select">Category</label>
              <select
                className="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-button">
              <button className="cancel-buttons" onClick={toggleAdd}>
                Cancel
              </button>
              <button className="add-buttn" onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
