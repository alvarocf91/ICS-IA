import React from "react";

function Article({ article, onPin }) {
  const cardStyle = article.pinned
    ? "border border-warning bg-light shadow"
    : "border border-secondary";

  return (
    <div className={`card mb-3 ${cardStyle}`}>
      <div className="card-body">
        <h5 className="card-title">
          {article.title} {article.pinned && <span className="badge bg-warning text-dark ms-2">Fijado</span>}
        </h5>
        <p className="card-text">Categoría: {article.category}</p>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => onPin(article.id)}>
           Fijar
        </button>
      </div>
    </div>
  );
}

export default Article;
