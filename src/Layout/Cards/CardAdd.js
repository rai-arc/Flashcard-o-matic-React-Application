import React, { useEffect, useState } from "react";
import CardForm from "./CardForm";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import Navigation from "../Navigation";

//This function adds card to the appropriate deck identified by :deckId in the url.
//The function shares the component CardForm with EditCard.

export default function CardAdd() {
  let { deckId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const blankCard = {
    front: "",
    back: "",
  };

  useEffect(() => {
    async function getDeck() {
      const response = readDeck(deckId);
      const apiDeck = await response;
      setCurrentDeck(apiDeck);
    }
    getDeck();
  }, [deckId]);

  function handleCreateCard(event) {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData(blankCard);
    history.go(0)
  }

  return (
    <div>
      <Navigation deck={currentDeck} pageName="Add Card" />

      <h1>{currentDeck.name}: Create Card</h1>

      <CardForm
        onSubmit={handleCreateCard}
        onCancel={() => history.push(`/decks/${currentDeck.id}`)}
        submitLabel="Save"
        cancelLabel="Done"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
