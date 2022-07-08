import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Navigation from "../Navigation";

//This component allows the user to study their cards.
//The current card is identified by its index.
//A loading useState is used to wait for the deck to finishe loading before determining to show the cards or "not enough cards" message.

export default function DeckStudy() {
  let { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const [cardsInDeck, setCardsInDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFront, setCardFront] = useState(true);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function loadDeckView() {
      const response = readDeck(deckId);
      const apiDeck = await response;
      setCurrentDeck(apiDeck);
      setCardsInDeck(apiDeck.cards);
      setLoading(false);
    }
    loadDeckView();
  }, [deckId]);

  function handleFlip() {
    setCardFront(!cardFront);
  }

  function handleNext() {
    if (cardIndex === cardsInDeck.length - 1) {
      if (
        window.confirm(
          "Restart Cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setCardIndex(0);
        setCardFront(true);
      } else {
        history.push("/");
      }
    } else {
      setCardIndex((cardIndex) => cardIndex + 1);
      setCardFront(true);
    }
  }

  return (
    <>
      <Navigation deck={currentDeck} pageName={"Study"} />
      <h1>{currentDeck.name}: Study</h1>
      {loading && <p>Loading...</p>}
      {cardsInDeck.length > 2 && (
        <>
          <div className="card px-3 py-3 mb-3">
            <h4>
              Card {[cardIndex + 1]} of {cardsInDeck.length}
            </h4>
            {cardFront ? (
              <p>{cardsInDeck[cardIndex].front}</p>
            ) : (
              <p>{cardsInDeck[cardIndex].back}</p>
            )}
            <div className="row">
              <button className="btn btn-secondary ml-4" onClick={handleFlip}>
                Flip
              </button>
              {!cardFront ? (
                <button className="btn btn-primary ml-2" onClick={handleNext}>
                  Next
                </button>
              ) : null}
            </div>
          </div>
        </>
      )}
      {cardsInDeck.length < 3 && (
        <>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {cardsInDeck.length}{" "}
            in this deck.
          </p>
          <Link to={`/decks/${currentDeck.id}/cards/new`}>
            <button className="btn btn-primary">➕Add Cards</button>
          </Link>
        </>
      )}
    </>
  );
}
