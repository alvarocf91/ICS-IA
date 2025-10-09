import React from "react";
import plantImg from "../assets/plant.jpg"; // Asegúrate de tener la imagen

const CardsSection = () => {
  const cards = Array(4).fill({
    img: plantImg,
    title: "Explora la Naturaleza",
    text: "Descubre cómo cuidar el medio ambiente y conectar con la vida natural.",
  });

  return (
    <section className="cards-section">
      {cards.map((c, index) => (
        <div key={index} className="card">
          <img src={c.img} alt={c.title} />
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </div>
      ))}
    </section>
  );
};

export default CardsSection;
