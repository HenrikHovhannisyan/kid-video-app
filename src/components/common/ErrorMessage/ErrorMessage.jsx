import React from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.css";

const ErrorMessage = ({ message, retry = null }) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {retry && (
        <button className="retry-button" onClick={retry}>
          Try again
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  retry: PropTypes.func,
};

export default ErrorMessage;
