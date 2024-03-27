import React from "react";

const Footer = () => {
  const date = new Date(Date.now()).getFullYear();

  return (
    <footer className="flex-row align-center px-3">
      <div style={{ color: "#FFFF" }}>
        <i className="bi bi-c-circle"></i> Copyright {date}, Kidus Geremew
      </div>
    </footer>
  );
};

export default Footer;
