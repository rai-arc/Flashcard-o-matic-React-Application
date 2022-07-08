import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

//This component is used to edit any deck.

export default function DeckEdit() {
  const [currentDeck, setCurrentDeck] = useState({});
  let { deckId } = useParams();
  useEffect(() => {
    async function setDeck() {
      const response = readDeck(deckId);
      const apiDeck = await response;
      setCurrentDeck(apiDeck);
    }
    setDeck();
  }, [deckId]);

  const history = useHistory();
  const [formData, setFormData] = useState({ currentDeck });
  const handleChange = ({ target }) => {
    setFormData({
      ...currentDeck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateDeck(formData);
    const deckId = response.id;
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <Navigation deck={currentDeck} pageName="Edit Deck" />
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="form-control"
            defaultValue={currentDeck.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="text"
            className="form-control"
            onChange={handleChange}
            defaultValue={currentDeck.description}
          ></textarea>
        </div>
        <Link to={`/decks/${currentDeck.id}`}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
