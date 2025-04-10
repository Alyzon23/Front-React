import React from 'react';
import { View, Text, Image } from 'react-native';
import BookCardStyles from '../styles/BookCardStyles';

const BookCard = ({ book }) => {
  return (
    <View style={BookCardStyles.container}>
      <Image source={{ uri: book.image }} style={BookCardStyles.image} />
      <View style={BookCardStyles.details}>
        <Text style={BookCardStyles.title}>{book.name}</Text>
        <Text style={BookCardStyles.author}>{book.author}</Text>
        <Text style={BookCardStyles.info}>Editorial: {book.editorial}</Text>
        <Text style={BookCardStyles.info}>Género: {book.genre}</Text>
        <Text style={BookCardStyles.info}>Año: {book.year}</Text>
        <Text style={BookCardStyles.info}>Páginas: {book.pages}</Text>
      </View>
    </View>
  );
};

export default BookCard;