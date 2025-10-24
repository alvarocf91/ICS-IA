import React from "react";
import Article from "./Article";

function ArticleList({ articles, onPin }) {
  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} article={article} onPin={onPin} />
      ))}
    </div>
  );
}

export default ArticleList;
