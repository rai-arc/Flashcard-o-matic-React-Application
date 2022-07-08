import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

//This component is used to edit any deck.

export default function DeckEdit() {
  const [formData, setFormData] = useState({});
  let { deckId } = useParams();
  useEffect(() => {
    async function setDeck() {
      const response = readDeck(deckId);
      const apiDeck = await response;
      setFormData(apiDeck);
    }
    setDeck();
  }, [deckId]);

  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData);
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <Navigation deck={formData} pageName="Edit Deck" />
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            type="text"
            onChange={handleChange}
            className="form-control"
            defaultValue={formData.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            required
            name="description"
            type="text"
            className="form-control"
            onChange={handleChange}
            defaultValue={formData.description}
          ></textarea>
        </div>
        <Link to={`/decks/${formData.id}`}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
