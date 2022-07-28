import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <div>
        <header>Hello, TrybeWallet!</header>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/carteira">
          <Wallet />
        </Route>

      </div>
    </Switch>
  );
}

export default App;
