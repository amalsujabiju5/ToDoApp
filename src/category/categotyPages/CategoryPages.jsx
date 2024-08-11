import React, { useContext, useState, useEffect } from "react";
import "./CategoryPages.css";
import boy from "../../Assets/boy.png";
import { useNavigate, useLocation } from "react-router-dom";
import { categories } from "../../Assets/assets";
import { TaskContext } from "../../Context/Context";

const CategoryPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks, addTask, updateTasks } = useContext(TaskContext);
  const { title, img } = location.state || {};

  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    title || categories[0].title
  );

  const toggleAdd = () => {
    setIsAddTaskVisible(!isAddTaskVisible);
  };

  const handleAddTask = () => {
    if (todo.trim() === "") return;

    const newTaskObj = {
      id: tasks.length + 1,
      task: todo,
      category: selectedCategory,
      completed: false,
    };

    addTask(newTaskObj);
    setTodo("");
    setIsAddTaskVisible(false);
  };

  const handleDelete = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    updateTasks(filteredTasks); // Update context with new tasks
  };

  const categoryTasks = tasks.filter(
    (task) => task.category === selectedCategory
  );
  const totalTasks = categoryTasks.length;

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="screen-backdrop-category">
      <div
        className={`screen-container-category ${
          isAddTaskVisible ? "blur" : ""
        }`}
      >
        <div className="back-button" onClick={() => navigate("/")}>
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
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </div>
        <div className="welcome-category">
          <div className="image-category">
            <div className="backdrop-category">
              <img src={img || boy} alt={title || "default"} />
            </div>
          </div>
          <div className="content-category">
            <p>{totalTasks} tasks</p>
            <h1>{title || "Add Task"}</h1>
          </div>
        </div>
        <div className="tasks-wrapper">
          {categoryTasks.map((task) => (
            <div className="tasks" key={task.id}>
              <div className="task-wrapper">
                <label htmlFor={`task-${task.id}`} className="task">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    readOnly
                  />
                  <span className="checkmark">
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
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <p>{task.task}</p>
                </label>
                <div
                  className="delete"
                  onClick={() => handleDelete(task.id)} // Correctly pass task.id
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`add-task-btn ${isAddTaskVisible ? "add-active" : ""}`}
        onClick={toggleAdd}
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

      {isAddTaskVisible && (
        <>
          <div className="black-backdrop visible"></div>
          <div className="add-task">
            <div className="add-task-backdrop"></div>
            <h1 className="heading">Add Task</h1>
            <div className="input-group">
              <label htmlFor="task-input">Task</label>
              <input
                type="text"
                id="task-input"
                required
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="category-select">Category</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select"
              >
                {categories.map((category) => (
                  <option key={category.title} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-buttons">
              <button className="cancel-btn" onClick={toggleAdd}>
                Cancel
              </button>
              <button className="add-btn" onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPages;
