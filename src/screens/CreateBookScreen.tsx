import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/CreateBookStyles';
import apiClient from '../api/axiosConfig';
import { API_ENDPOINTS } from '../api/config';

interface Author {
  id: number;
  nombre: string;
  apellidos: string;
}

interface Editorial {
  id: number;
  nombre: string;
}

const CreateBookScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genero, setGenero] = useState('');
  const [anio, setAnio] = useState('');
  const [paginas, setPaginas] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [autorId, setAutorId] = useState<number | null>(null);
  const [editorialId, setEditorialId] = useState<number | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editorials, setEditorials] = useState<Editorial[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [aRes, eRes] = await Promise.all([
          apiClient.get<Author[]>(API_ENDPOINTS.GET_AUTORES),
          apiClient.get<Editorial[]>(API_ENDPOINTS.GET_EDITORIALES),
        ]);
        setAuthors(aRes.data);
        setEditorials(eRes.data);
      } catch (err) {
        Alert.alert('Error', 'No se pudieron cargar autores o editoriales');
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería para subir imágenes');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!titulo.trim() || !autorId || !editorialId) {
      return Alert.alert('Error', 'Título, Autor y Editorial son obligatorios');
    }

    setLoading(true);

    try {
      const payload = {
        titulo: titulo.trim(),
        isbn: isbn.trim() || undefined,
        genero: genero.trim() || undefined,
        anioPublicacion: anio ? parseInt(anio, 10) : undefined,
        paginas: paginas ? parseInt(paginas, 10) : undefined,
        descripcion: descripcion.trim() || undefined,
        autores: [{ id: autorId }],
        editorial: { id: editorialId },
      };

      const res = await apiClient.post(API_ENDPOINTS.CREATE_LIBRO, payload);

      if (res.status !== 201) {
        throw new Error('No se pudo crear el libro');
      }

      const libroId = res.data.id;

      if (imageUri) {
        const form = new FormData();
        // @ts-ignore
        form.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `book_${libroId}.jpg`,
        });
        form.append('tipoImagen', 'portada');

        await apiClient.post(
          `/api/imagenes/libro/${libroId}`,
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      Alert.alert('¡Listo!', 'Libro creado con éxito');
      navigation.goBack();
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Libro</Text>
      {loading && <ActivityIndicator size="large" color="#2B2D42" />}

      <TextInput
        style={styles.input}
        placeholder="Título *"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="ISBN"
        value={isbn}
        onChangeText={setIsbn}
      />
      <TextInput
        style={styles.input}
        placeholder="Género"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="Año de publicación"
        keyboardType="numeric"
        value={anio}
        onChangeText={setAnio}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de páginas"
        keyboardType="numeric"
        value={paginas}
        onChangeText={setPaginas}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Autor *</Text>
      <Picker
        selectedValue={autorId}
        onValueChange={(v) => setAutorId(v)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona autor..." value={null} />
        {authors.map((a) => (
          <Picker.Item
            key={a.id}
            label={`${a.nombre} ${a.apellidos}`}
            value={a.id}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Editorial *</Text>
      <Picker
        selectedValue={editorialId}
        onValueChange={(v) => setEditorialId(v)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona editorial..." value={null} />
        {editorials.map((e) => (
          <Picker.Item key={e.id} label={e.nombre} value={e.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>
          {imageUri ? 'Cambiar imagen' : 'Seleccionar imagen'}
        </Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.preview}
        />
      )}

      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creando...' : 'Crear Libro'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateBookScreen;
