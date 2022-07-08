import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";

//This component lists cards and handles the deletion of cards.
//This component is used in DeckView.

export default function CardList({ deck }) {
  const { deckId } = useParams();
  const history = useHistory();
  const deleteHandle = async (card) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(card);
      history.go(0);
    }
  };

  return deck.map((card, index) => {
    return (
      <div className="card px-5 py-3 mb-3" key={index}>
        <div className="row d-flex justify-content-between">
          <p>{card.front}</p>
          <p>{card.back}</p>
        </div>
        <div className="row ml-auto">
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button className="btn btn-primary mr-1">✏️Edit</button>
          </Link>
          <button
            onClick={() => deleteHandle(card.id)}
            className="btn btn-danger px-2"
          >
            🗑️
          </button>
        </div>
      </div>
    );
  });
}
