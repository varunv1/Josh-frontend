import React from "react";

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white fs-2">Price Feeds</a>

        <button
          className="btn btn-outline-warning text-white btn-lg"
          type="submit"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Header;
