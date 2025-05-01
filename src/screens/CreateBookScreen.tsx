// src/screens/CreateBookScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import api from '../api/api';

export default function CreateBookScreen({ navigation }) {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    year: '',
    pages: '',
    image: '',
  });

  const handleSave = async () => {
    try {
      await api.post('/books', book);
      Alert.alert('Libro creado');
      navigation.goBack();
    } catch (error) {
      console.error('Error al crear libro', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Título" value={book.name} onChangeText={(text) => setBook({ ...book, name: text })} />
      <TextInput placeholder="Género" value={book.genre} onChangeText={(text) => setBook({ ...book, genre: text })} />
      <TextInput placeholder="Año" keyboardType="numeric" value={book.year} onChangeText={(text) => setBook({ ...book, year: text })} />
      <TextInput placeholder="Páginas" keyboardType="numeric" value={book.pages} onChangeText={(text) => setBook({ ...book, pages: text })} />
      <TextInput placeholder="URL Imagen" value={book.image} onChangeText={(text) => setBook({ ...book, image: text })} />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}
