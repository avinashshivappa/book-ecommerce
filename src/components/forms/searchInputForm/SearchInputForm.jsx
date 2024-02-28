// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./searchInputForm.styles.css";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const SearchInputForm = ({ darkTheme }) => {
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const redirectToSearch = () => {
    if (searchField === "") {
      alert("SearchField is Empty");
    } else {
      navigate("/search", { state: searchField });
    }
  };

  return (
    <div
      className={`search-input-form-container ${
        darkTheme ? "dark-box-shadow" : "light-box-shadow"
      }`}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search Books"
        value={searchField}
        onChange={handleChange}
      />
      <button onClick={redirectToSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchInputForm;
