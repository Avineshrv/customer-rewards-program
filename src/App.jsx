import React, { useState } from 'react';
import Dashboard from './pages/dashboard';
import CustomerRewards from './pages/customerRewards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [, setSelectedCustomer] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard setSelectedCustomer={setSelectedCustomer} />}
        />
        <Route path="/rewards/:customerId" element={<CustomerRewards />} />
      </Routes>
    </Router>
  );
};

export default App;
