import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import TopBooksStyles from '../styles/TopBooksStyles';

const topBooks = [
  // Aquí coloca el arreglo con los 10 libros más leídos
];

const TopBooksScreen = () => {
  return (
    <View style={TopBooksStyles.container}>
      <Text style={TopBooksStyles.title}>Top 10 Libros Más Leídos</Text>
      <FlatList
        data={topBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={TopBooksStyles.book}>
            <Image style={TopBooksStyles.bookImage} source={{ uri: item.image }} />
            <Text style={TopBooksStyles.bookName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TopBooksScreen;