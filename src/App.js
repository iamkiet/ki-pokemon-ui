import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import Home from "./components/Home";

import PokemonContextProvider from './contexts/PokemonContextProvider';

function App() {
  return (
        <PokemonContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </PokemonContextProvider>
  );
}

export default App;