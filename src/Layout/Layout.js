import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import DeckCreate from "./Decks/DeckCreate";
import DeckStudy from "./Decks/DeckStudy";
import DeckView from "./Decks/DeckView";
import DeckEdit from "./Decks/DeckEdit";
import CardAdd from "./Cards/CardAdd";
import CardEdit from "./Cards/CardEdit";

//This function holds all of our base components and renders them with Switch

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <DeckCreate />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <DeckView />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <DeckEdit />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <DeckStudy />
          </Route>
          <Route exact path={`/decks/:deckId/cards/new`}>
            <CardAdd />
          </Route>
          <Route exact path={`/decks/:deckId/cards/:cardId/edit`}>
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

