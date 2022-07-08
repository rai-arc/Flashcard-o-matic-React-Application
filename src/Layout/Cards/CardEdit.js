import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import Navigation from "../Navigation";

//This component is ued to edit cards.
//It uses the CardForm component to handle the form.

export default function CardEdit() {
  let { deckId, cardId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function getDeck() {
      const response = readDeck(deckId);
      const apiDeck = await response;
      setCurrentDeck(apiDeck);
      const cardResponse = readCard(cardId);
      const apiCard = await cardResponse;
      setFormData(apiCard);
    }
    getDeck();
  }, [deckId, cardId]);

  async function handleEditCard(event) {
    event.preventDefault();
    await updateCard(formData);
    console.log(formData);
    history.push(`/decks/${currentDeck.id}`);
  }

  return (
    <div>
      <Navigation deck={currentDeck} card={formData} />

      <h1>Edit Card</h1>

      <CardForm
        onSubmit={handleEditCard}
        onCancel={() => history.push(`/decks/${currentDeck.id}`)}
        submitLabel="Save"
        cancelLabel="Done"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
