// src/screens/ManageAuthorsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import styles from '../styles/ManageAuthorsStyles';
import apiClient from '../api/axiosConfig';
import { API_ENDPOINTS } from '../api/config';

interface Autor {
  id: number;
  nombre: string;
  apellidos?: string;
  fechaNacimiento?: string;  // ISO: YYYY-MM-DD
  nacionalidad?: string;
  biografia?: string;
}

const ManageAuthorsScreen: React.FC = () => {
  const [authors, setAuthors] = useState<Autor[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [biografia, setBiografia] = useState('');
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<Autor[]>(API_ENDPOINTS.GET_AUTORES);
      setAuthors(res.data);
    } catch {
      Alert.alert('Error', 'No se pudo cargar la lista de autores');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!nombre.trim()) {
      return Alert.alert('Error', 'El nombre es obligatorio');
    }

    const payload = {
      nombre: nombre.trim(),
      apellidos: apellidos.trim() || undefined,
      fechaNacimiento: fechaNacimiento || undefined,
      nacionalidad: nacionalidad.trim() || undefined,
      biografia: biografia.trim() || undefined,
    };

    try {
      if (editandoId === null) {
        await apiClient.post(API_ENDPOINTS.CREATE_AUTOR, payload);
      } else {
        await apiClient.put(
          `${API_ENDPOINTS.UPDATE_AUTOR}/${editandoId}`,
          payload
        );
      }
      resetForm();
      fetchAuthors();
    } catch {
      Alert.alert('Error', 'No se pudo guardar el autor');
    }
  };

  const handleEdit = (autor: Autor) => {
    setNombre(autor.nombre);
    setApellidos(autor.apellidos || '');
    setFechaNacimiento(autor.fechaNacimiento || '');
    setNacionalidad(autor.nacionalidad || '');
    setBiografia(autor.biografia || '');
    setEditandoId(autor.id);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Deseas eliminar este autor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.delete(`${API_ENDPOINTS.DELETE_AUTOR}/${id}`);
              fetchAuthors();
            } catch {
              Alert.alert('Error', 'No se pudo eliminar el autor');
            }
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setNombre('');
    setApellidos('');
    setFechaNacimiento('');
    setNacionalidad('');
    setBiografia('');
    setEditandoId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Autores</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2B2D42" />
      ) : (
        <FlatList
          data={authors}
          keyExtractor={(a) => a.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.itemInfo}>
                <Text style={styles.authorText}>
                  {item.nombre} {item.apellidos || ''}
                </Text>
                <Text style={styles.subText}>
                  {item.fechaNacimiento
                    ? `Nacimiento: ${item.fechaNacimiento}`
                    : ''}
                </Text>
                <Text style={styles.subText}>
                  {item.nacionalidad || ''}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={styles.list}
        />
      )}

      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre *"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={setApellidos}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento (YYYY-MM-DD)"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChangeText={setNacionalidad}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Biografía"
          multiline
          numberOfLines={4}
          value={biografia}
          onChangeText={setBiografia}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {editandoId ? 'Actualizar Autor' : 'Agregar Autor'}
          </Text>
        </TouchableOpacity>

        {editandoId && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={resetForm}
          >
            <Text style={styles.cancelText}>Cancelar edición</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageAuthorsScreen;
