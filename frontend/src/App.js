import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import { getAuthToken } from './components/api';  

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken();
      setIsLoggedIn(!!token);  // If token exists, set user as logged in
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            <nav>
              <ul>
                <li><a href="/expenses">View Expenses</a></li>
                <li><a href="/add-expense">Add Expense</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="*" element={<Navigate to="/expenses" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
