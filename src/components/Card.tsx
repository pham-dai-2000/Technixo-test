import React from "react";

interface CardProps {
  symbol: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ symbol, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={onClick}
    >
      {isFlipped ? symbol : "?"}
    </div>
  );
};

export default Card;