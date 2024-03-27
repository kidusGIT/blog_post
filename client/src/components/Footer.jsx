import React from "react";

const Footer = () => {
  const date = new Date(Date.now()).getFullYear();

  return (
    <footer className="flex-row flex-center px-3">
      <div style={{ color: "#FFFF" }}>
        Copy rights <i className="bi bi-c-circle"></i> {date}
      </div>
    </footer>
  );
};

export default Footer;
