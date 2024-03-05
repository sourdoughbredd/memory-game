import "../styles/CardContainer.css";
import Card from "./Card.jsx";

export default function CardContainer({ cards, cardOnClick }) {
  return (
    <div className="card-container">
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            name={card.name}
            img={card.img}
            onClick={(e) => cardOnClick(e, card.id)}
          ></Card>
        );
      })}
    </div>
  );
}
