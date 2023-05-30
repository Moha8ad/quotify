import React from "react";

import "./styles.css";

export const SearchBox = ({ placeholder, handleChange }) => (
  <form className="d-flex flex-fill">
    <i className="search-icon bi bi-search"></i>
    <input
      className="input-box form-control text-light p-2 ps-5"
      type="search"
      text="search"
      aria-label="Search"
      name="searchField"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </form>
);

export default SearchBox;
