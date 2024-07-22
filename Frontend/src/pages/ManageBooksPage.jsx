import React from 'react';
import BookForm from '../components/BookForm';

const ManageBooksPages = () => {
  // Function to handle success, e.g., redirect or show a message
  const handleSuccess = () => {
    console.log('Book saved successfully');
    // Add your success handling logic here
  };

  return (
    <div>
      <h1>Manage Books</h1>
      <BookForm onSuccess={handleSuccess} />
    </div>
  );
};

export default ManageBooksPages;
