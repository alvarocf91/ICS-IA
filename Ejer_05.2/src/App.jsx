import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";
import EmptyState from "./components/EmptyState";

const initialArticles = [
  { id: "a1", title: "React 19 ya está aquí", category: "React", pinned: true },
  { id: "a2", title: "Novedades en CSS: View Transitions", category: "CSS", pinned: false },
  { id: "a3", title: "State Management con Zustand", category: "React", pinned: false },
  { id: "a4", title: "El futuro de JavaScript: Records y Tuples", category: "JavaScript", pinned: false },
];

function App() {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredArticles = articles.filter((article) => {
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === "Todas" || article.category === category;
    return matchSearch && matchCategory;
  });

  const togglePin = (id) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, pinned: true } : { ...a, pinned: false }
      )
    );
  };

  const orderedArticles = [...filteredArticles].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Feed de Noticias</h1>


      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

 
      <div className="d-flex justify-content-center gap-2 mb-3">
        {["Todas", "React", "CSS", "JavaScript"].map((cat) => (
          <button
            key={cat}
            className={`btn btn-${category === cat ? "primary" : "outline-primary"}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>


      {orderedArticles.length > 0 ? (
        <ArticleList articles={orderedArticles} onPin={togglePin} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default App;
