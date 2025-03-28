import React from "react";

interface ButtonProps {
  onClick: () => void;
}

export const GradientButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "linear-gradient(90deg, #f6d365, #fda085)", // Light gradient
        color: "#fff", // White text
        border: "none",
        borderRadius: "10px", // Rounded corners
        padding: "12px 24px", // Spacing
        fontSize: "16px", // Text size
        fontWeight: "bold",
        cursor: "pointer", // Pointer cursor on hover
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for "pop"
        transition: "transform 0.2s ease, box-shadow 0.2s ease", // Hover effects
      }}
      onMouseEnter={(e) => {
        const button = e.currentTarget;
        button.style.transform = "scale(1.05)";
        button.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        const button = e.currentTarget;
        button.style.transform = "scale(1)";
        button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      Upload Document & Start Chat
    </button>
  );
};
