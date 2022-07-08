import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

//This component holds the home view with a variety of options to view, edit, study, or delete decks

export default function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const response = listDecks();
      const apiDecks = await response;
      setDecks(apiDecks);
    }
    loadDecks();
  }, []);
  console.log(decks);

  const deleteDeckHandler = (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId);
      history.go(0);
    } else {
      console.log("deleteDeck canceled");
    }
  };

  return (
    <>
      <Link to="/decks/new">
        <button className="btn btn-secondary mb-3">➕ Create Deck</button>
      </Link>
      <div className="w-100">
      {decks.map((deck, index) => {
        return (
          <div key={index} className="card px-5 py-3 mb-3">
            <div className="row d-flex justify-content-between">
              <h2>{deck.name}</h2>
              <h5 className="card-count">{deck.cards.length} cards</h5>
            </div>
            <p>{deck.description}</p>
            <div className="row">
              <Link to={`/decks/${deck.id}`}>
                <button className="btn btn-secondary pl-1 mr-1">👁View</button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-primary mr-1">📖Study</button>
              </Link>
                <button
                  onClick={() => deleteDeckHandler(deck.id)}
                  className="btn btn-danger px-2 ml-auto"
                >
                  🗑️
                </button>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
}
