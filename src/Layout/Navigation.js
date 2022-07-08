import React from "react";
import { Link } from "react-router-dom";

//This component takes props to add list items or links to the component it is in, leading to breadcrumb navigation
//All props are intialized to null to ensure no extra breadcrumbs are created

export default function Navigation({
  deckView = null,
  deck = null,
  card = null,
  pageName = null,
}) {
  return (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {deckView && (
          <li className="breadcrumb-item active">{deckView.name}</li>
        )}
        {deck && (
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
        )}
        {card && (
          <li className="breadcrumb-item active">Edit Card {card.id}</li>
        )}
        {pageName && <li className="breadcrumb-item active">{pageName}</li>}
      </ol>
    </nav>
  );
}
