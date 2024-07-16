import React, { useEffect } from "react";

const Notification = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Notification disappears after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      {message}
      <button className="close-button" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Notification;
