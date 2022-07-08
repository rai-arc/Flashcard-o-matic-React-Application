import React from "react";
import CardList from "../Cards/CardList";
import { useHistory, useParams } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import { Link } from "react-router-dom";

//This component renders a single deck and its options, including a delete option

export default function DeckInfo({ deck, cards }) {
  const history = useHistory();
  const { deckId } = useParams();

  const deleteDeckHandler = (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId);
      history.push("/");
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="row mx-auto">
        <Link to={`/decks/${deck.id}/edit`}>
          <button className="btn btn-secondary pl-1 mr-1">✏️Edit</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button className="btn btn-primary mr-1">📖Study</button>
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="btn btn-primary mr-1">➕Add Cards</button>
        </Link>
        <button
          onClick={() => deleteDeckHandler(deckId)}
          className="btn btn-danger ml-auto"
        >
          🗑️
        </button></div>
      </div>
      <div>
        <h2>Cards</h2>
        <CardList deck={cards} />
      </div>
    </>
  );
}
