import React, { useState } from "react";
import Navigation from "../Navigation";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

//This component creates a deck and adds it to the database.

export default function DeckCreate() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(formData);
    const deckId = response.id;
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <Navigation pageName="Create Deck" />
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Deck Name"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Brief description of the deck"
          ></textarea>
        </div>
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
