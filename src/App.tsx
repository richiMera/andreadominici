import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GsapTry from './components/GsapTry';




const App: React.FC = () => {
  return (

    <Router>
      <Routes>

        <Route path="/" element={<GsapTry />} />

      </Routes>
    </Router>
  );
};

export default App;
