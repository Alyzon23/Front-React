import React from 'react';
import { FlatList } from 'react-native';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  const renderBook = ({ item }) => <BookCard book={item} />;

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={renderBook}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default BookList;