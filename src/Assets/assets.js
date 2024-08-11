import boy from "../Assets/boy.png";
import briefcase from "../Assets/briefcase.png";
import shopping from "../Assets/shopping.png";
import webdesign from "../Assets/web-design.png";
import healthcare from "../Assets/healthcare.png";
import dumbbell from "../Assets/dumbbell.png";
import education from "../Assets/education.png";
import savings from "../Assets/saving.png";

export const categories = [
    { title: "Personal", img: boy },
    { title: "Work", img: briefcase },
    { title: "Shopping", img: shopping },
    { title: "Coding", img: webdesign },
    { title: "Health", img: healthcare },
    { title: "Fitness", img: dumbbell },
    { title: "Education", img: education },
    { title: "Finance", img: savings },
];

export const tasks = [
    { id: 1, task: "Go to market", category: "Shopping", completed: false },
    { id: 2, task: "Read a chapter of a book", category: "Personal", completed: false },
    // Add other tasks here
];
