import React, { useState } from 'react';
import { View, Text } from 'react-native';
import HomeStyles from '../styles/HomeStyles';
import SearchBar from '../components/SearchBar';
import GenrePicker from '../components/GenrePicker';
import BookList from '../components/BookList';

const books = [
  {
    id: '1',
    name: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    editorial: 'Sudamericana',
    genre: 'Realismo Mágico',
    year: 1967,
    pages: 417,
    image: 'https://images.cdn2.buscalibre.com/fit-in/360x360/38/12/3812f54c9c10992f538ead2c95d775ed.jpg',
  },
  {
    id: '2',
    name: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    editorial: 'Francisco de Robles',
    genre: 'Clásico',
    year: 1605,
    pages: 863,
    image: 'https://images.cdn2.buscalibre.com/fit-in/360x360/c0/63/c0633c2d4dd430b32d5e02475461f030.jpg',
  },
    {
      id: '3',
      name: 'El Principito',
      author: 'Antoine de Saint-Exupéry',
      editorial: 'Reynal & Hitchcock',
      genre: 'Ficción',
      year: 1943,
      pages: 96,
      image: 'https://assets.isu.pub/document-structure/230528025355-d63d0fe1b0bbc7bfd65e0a19d7c9d99c/v1/594ca0841459da8c6166eec6f9eea1df.jpeg',
    },
    {
      id: '4',
      name: '1984',
      author: 'George Orwell',
      editorial: 'Secker & Warburg',
      genre: 'Ciencia Ficción',
      year: 1949,
      pages: 328,
      image: 'https://www.libreriaespanola.com/wp-content/uploads/2023/01/05068048.jpg',
    },
    {
      id: '5',
      name: 'Crónica de una Muerte Anunciada',
      author: 'Gabriel García Márquez',
      editorial: 'Mondadori',
      genre: 'Realismo Mágico',
      year: 1981,
      pages: 120,
      image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/e4/2e/e42e547626582cd8bbe8caab9aa860ca.jpg',
    },
    {
      id: '6',
      name: 'Frankenstein',
      author: 'Mary Shelley',
      editorial: 'Lackington, Hughes, Harding, Mavor & Jones',
      genre: 'Terror',
      year: 1818,
      pages: 280,
      image: 'https://images.cdn2.buscalibre.com/fit-in/360x360/0b/34/0b34f7c5e7987f434818bd8a5de54084.jpg',
    },
    {
      id: '7',
      name: 'Rayuela',
      author: 'Julio Cortázar',
      editorial: 'Sudamericana',
      genre: 'Experimental',
      year: 1963,
      pages: 600,
      image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1459424996i/29747917.jpg',
    },
    {
      id: '8',
      name: 'Orgullo y Prejuicio',
      author: 'Jane Austen',
      editorial: 'Thomas Egerton',
      genre: 'Romance',
      year: 1813,
      pages: 432,
      image: 'https://m.media-amazon.com/images/M/MV5BZjBlODgwZWEtODcxMi00OTY5LWEyOTItODE2MDBjZjU0ZDU3XkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: '9',
      name: 'Los Miserables',
      author: 'Victor Hugo',
      editorial: 'A. Lacroix, Verboeckhoven & Cía',
      genre: 'Drama',
      year: 1862,
      pages: 1488,
      image: 'https://miencuentroconlaliteratura.wordpress.com/wp-content/uploads/2014/10/470-21.jpg',
    },
    {
      id: '10',
      name: 'La Divina Comedia',
      author: 'Dante Alighieri',
      editorial: 'Numerosas ediciones (originalmente manuscrito)',
      genre: 'Épico',
      year: 1320,
      pages: 712,
      image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/0b/7a/0b7a0edcdb38d4fe128b379368d1abe4.jpg',
    },
];

const genres = ['Todos', 'Realismo Mágico', 'Clásico', 'Ficción', 'Terror'];

const HomeScreen = () => {
  const [searchAuthor, setSearchAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleAuthorSearch = (query) => {
    setSearchAuthor(query);
    const filtered = books.filter(
      (book) =>
        book.author.toLowerCase().includes(query.toLowerCase()) &&
        (selectedGenre === 'Todos' || book.genre === selectedGenre)
    );
    setFilteredBooks(filtered);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    const filtered = books.filter(
      (book) =>
        (genre === 'Todos' || book.genre === genre) &&
        book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <View style={HomeStyles.container}>
      <Text style={HomeStyles.title}>Librería Virtual</Text>
      <SearchBar
        value={searchAuthor}
        onChangeText={handleAuthorSearch}
        placeholder="Busca por autor"
      />
      <GenrePicker
        selectedValue={selectedGenre}
        onValueChange={handleGenreChange}
        genres={genres}
      />
      <BookList books={filteredBooks} />
    </View>
  );
};

export default HomeScreen;