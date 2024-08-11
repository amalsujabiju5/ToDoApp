import React from "react";
import "./TestComponent.css";

const TestComponent = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div
      style={{
        background: "lightgray",
        padding: "20px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      Click me
    </div>
  );
};

export default TestComponent;
