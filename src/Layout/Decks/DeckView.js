import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation";
import DeckInfo from "./DeckInfo";

//This component renders the deck view for a single deck.

export default function DeckView() {
  let { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const [cardsInDeck, setCardsInDeck] = useState([]);

  useEffect(() => {
    async function loadDeckView() {
      const response = readDeck(deckId);
      const apiDeck = await response;
      setCurrentDeck(apiDeck);
      let { cards } = apiDeck;
      setCardsInDeck(cards);
    }
    loadDeckView();
  }, [deckId]);
  return (
    <>
      <Navigation deckView={currentDeck} />
      <DeckInfo deck={currentDeck} cards={cardsInDeck} />
    </>
  );
}
