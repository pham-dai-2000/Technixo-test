import React, { useState, useEffect } from "react";
import Card from "./Card";

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generatePairs = () => {
  const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const pairs = [...symbols, ...symbols];
  return shuffleArray(pairs);
};

const Board: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    const pairs = generatePairs();
    setCards(pairs);
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2) {
      return;
    }

    if (flipped.length === 1 && flipped[0] === index) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="board">
      {cards.map((symbol, index) => (
        <Card
          key={index}
          symbol={symbol}
          isFlipped={flipped.includes(index) || solved.includes(index)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
