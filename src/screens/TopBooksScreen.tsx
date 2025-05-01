import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from '../styles/TopBooksStyles';
import SideBar from '../components/SideBar';

const topBooks = [
  { id: '1',  name: 'Cien Años de Soledad',         image: 'https://example.com/book1.jpg' },
  { id: '2',  name: 'Don Quijote de la Mancha',      image: 'https://example.com/book2.jpg' },
  { id: '3',  name: 'El Principito',                image: 'https://example.com/book3.jpg' },
  { id: '4',  name: '1984',                          image: 'https://example.com/book4.jpg' },
  { id: '5',  name: 'Orgullo y Prejuicio',           image: 'https://example.com/book5.jpg' },
  { id: '6',  name: 'Los Miserables',                image: 'https://example.com/book6.jpg' },
  { id: '7',  name: 'La Divina Comedia',             image: 'https://example.com/book7.jpg' },
  { id: '8',  name: 'Rayuela',                       image: 'https://example.com/book8.jpg' },
  { id: '9',  name: 'Crimen y Castigo',              image: 'https://example.com/book9.jpg' },
  { id: '10', name: 'El Alquimista',                 image: 'https://example.com/book10.jpg'},
];

const TopBooksScreen: React.FC = () => (
  <View style={styles.container}>
    {/* Header con SideBar y LYXA */}
    <View style={styles.headerContainer}>
      <SideBar />
      <Text style={styles.headerTitle}>LYXA</Text>
    </View>

    {/* Título de la sección */}
    <Text style={styles.title}>Top 10 Libros Más Leídos</Text>

    {/* Lista */}
    <FlatList
      data={topBooks}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.bookCard}>
          <View style={styles.bookImageWrapper}>
            <Image source={{ uri: item.image }} style={styles.bookImage} />
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

export default TopBooksScreen;
