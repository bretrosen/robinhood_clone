import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Portfolio from "./components/Portfolio";
import StockDetails from './components/StockDetail'
import Watchlist from "./components/Watchlist";
import TransactionsPage from "./components/Transaction/TransactionsPage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
          <LandingPage/>
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/transactions">
            <TransactionsPage />
          </Route>
          <Route path="/watchlists/:watchlistId">
            <Watchlist />
          </Route>
          <Route path="/stocks/:stockId">
            <StockDetails />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
