import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Signup';
import ManageBooksPage from './pages/ManageBooksPage';
import AddBookPage from './pages/AddBookPage';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/manage-books"
            element={
              <PrivateRoute>
                <ManageBooksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <PrivateRoute>
                <AddBookPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
