import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStyles from '../styles/HomeStyles';
import SearchBar from '../components/SearchBar';
import GenrePicker from '../components/GenrePicker';
import BookList from '../components/BookList';
import SideBar from '../components/SideBar';
import { useNavigation } from '@react-navigation/native';

// datos de ejemplo (luego vendrán de la API)
const books = [ /* tus 10 libros aquí */ ];
const genres = ['Todos', 'Realismo Mágico', 'Clásico', 'Ficción', 'Terror'];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchAuthor, setSearchAuthor]   = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [role, setRole]                   = useState<string | null>(null);
  const [loadingRole, setLoadingRole]     = useState(true);

  // leo rol al iniciar
  useEffect(() => {
    (async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        setRole(storedRole);
      } catch {
        Alert.alert('Error', 'No se pudo obtener el rol.');
      } finally {
        setLoadingRole(false);
      }
    })();
  }, []);

  // filtro libros
  useEffect(() => {
    const filtered = books.filter(b =>
      b.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
      (selectedGenre === 'Todos' || b.genre === selectedGenre)
    );
    setFilteredBooks(filtered);
  }, [searchAuthor, selectedGenre]);

  if (loadingRole) {
    return (
      <View style={HomeStyles.container}>
        <ActivityIndicator size="large" color="#2B2D42" />
      </View>
    );
  }

  return (
    <View style={HomeStyles.container}>
      {/* Header */}
      <View style={HomeStyles.header}>
        <SideBar />
        <Text style={HomeStyles.title}>LYXA</Text>
      </View>

      {/* Panel Admin */}
      {role === 'ROLE_ADMIN' && (
        <View style={HomeStyles.adminPanel}>
          <Text style={HomeStyles.adminTitle}>Panel de Admin</Text>
          <View style={HomeStyles.adminButtonsContainer}>
            <TouchableOpacity
              style={HomeStyles.adminButton}
              onPress={() => navigation.navigate('CreateBook' as never)}
            >
              <Text style={HomeStyles.adminButtonText}>+ Agregar Libro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={HomeStyles.adminButton}
              onPress={() => navigation.navigate('ManageAuthors' as never)}
            >
              <Text style={HomeStyles.adminButtonText}>✏️ Autores</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={HomeStyles.adminButton}
              onPress={() => navigation.navigate('ManagePublishers' as never)}
            >
              <Text style={HomeStyles.adminButtonText}>🏢 Editoriales</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Filtros y listado */}
      <SearchBar
        value={searchAuthor}
        onChangeText={setSearchAuthor}
        placeholder="Busca por autor"
      />
      <GenrePicker
        selectedValue={selectedGenre}
        onValueChange={setSelectedGenre}
        genres={genres}
      />
      <BookList books={filteredBooks} />
    </View>
  );
};

export default HomeScreen;
