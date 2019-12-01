import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import index from './routes/router';

export default function App() {
  return (
    <Router>
      { index }
    </Router>
  );
}
