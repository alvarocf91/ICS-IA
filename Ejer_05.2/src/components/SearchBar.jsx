import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-3 text-center">
      <input
        type="text"
        className="form-control w-50 mx-auto"
        placeholder="Buscar artículo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
