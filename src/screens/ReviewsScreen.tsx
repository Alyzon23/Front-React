import React from 'react';
import { View, Text } from 'react-native';
import ReviewsStyles from '../styles/ReviewsStyles';

const ReviewsScreen = () => {
  return (
    <View style={ReviewsStyles.container}>
      <Text style={ReviewsStyles.title}>Reseñas</Text>
      <Text style={ReviewsStyles.text}>Explora reseñas de tus libros favoritos.</Text>
    </View>
  );
};

export default ReviewsScreen;