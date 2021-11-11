import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Start from './components/Start';
import ImageUpload from './components/ImageUpload';

import './App.css';

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Route exact path="/" component={Start} />
        <Route exact path="/upload" component={ImageUpload} />
      </div>
    </Router>
  );
}

export default App;