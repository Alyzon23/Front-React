// src/screens/ManagePublishersScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/ManagePublishersStyles';
import apiClient from '../api/axiosConfig';
import { API_ENDPOINTS } from '../api/config';

interface Editorial {
  id: number;
  nombre: string;
  direccion?: string;
  ciudad?: string;
  pais?: string;
  telefono?: string;
  email?: string;
  sitioWeb?: string;
}

const ManagePublishersScreen: React.FC = () => {
  const [publishers, setPublishers] = useState<Editorial[]>([]);
  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    pais: '',
    telefono: '',
    email: '',
    sitioWeb: '',
  });

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<Editorial[]>(API_ENDPOINTS.GET_EDITORIALES);
      setPublishers(res.data);
    } catch (e) {
      console.error('Error al cargar editoriales:', e);
      Alert.alert('Error', 'No se pudieron cargar las editoriales');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      direccion: '',
      ciudad: '',
      pais: '',
      telefono: '',
      email: '',
      sitioWeb: '',
    });
    setEditandoId(null);
  };

  // ─── 1) Cambios en handleSave: logs de payload y respuesta ───
  const handleSave = async () => {
    if (!form.nombre.trim()) {
      return Alert.alert('Error', 'El nombre es obligatorio');
    }

    const payload = { ...form, nombre: form.nombre.trim() };
    console.log('📤 Payload a enviar:', payload);

    try {
      setLoading(true);

      let res;
      if (editandoId === null) {
        res = await apiClient.post(API_ENDPOINTS.CREATE_EDITORIAL, payload);
      } else {
        res = await apiClient.put(
          `${API_ENDPOINTS.UPDATE_EDITORIAL}/${editandoId}`,
          payload
        );
      }

      console.log('✅ Respuesta del servidor:', res.status, res.data);
      resetForm();
      fetchPublishers();
    } catch (err: any) {
      console.error(
        '❌ Error al guardar editorial:',
        err.response?.status,
        err.response?.data
      );
      const message = err.response?.data?.message || err.message;
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e: Editorial) => {
    setEditandoId(e.id);
    setForm({
      nombre: e.nombre,
      direccion: e.direccion || '',
      ciudad: e.ciudad || '',
      pais: e.pais || '',
      telefono: e.telefono || '',
      email: e.email || '',
      sitioWeb: e.sitioWeb || '',
    });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro de eliminar esta editorial?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.delete(`${API_ENDPOINTS.DELETE_EDITORIAL}/${id}`);
              fetchPublishers();
            } catch {
              Alert.alert('Error', 'No se pudo eliminar la editorial');
            }
          },
        },
      ]
    );
  };

  // ─── 2) Sustituir ScrollView+FlatList anidado por FlatList con ListHeaderComponent ───
  return (
    <FlatList
      data={publishers}
      keyExtractor={e => e.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <>
          <Text style={styles.title}>Gestión de Editoriales</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre *"
            value={form.nombre}
            onChangeText={text => setForm(f => ({ ...f, nombre: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={form.direccion}
            onChangeText={text => setForm(f => ({ ...f, direccion: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={form.ciudad}
            onChangeText={text => setForm(f => ({ ...f, ciudad: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="País"
            value={form.pais}
            onChangeText={text => setForm(f => ({ ...f, pais: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={form.telefono}
            onChangeText={text => setForm(f => ({ ...f, telefono: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={text => setForm(f => ({ ...f, email: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Sitio Web"
            value={form.sitioWeb}
            onChangeText={text => setForm(f => ({ ...f, sitioWeb: text }))}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {editandoId === null ? 'Agregar Editorial' : 'Actualizar Editorial'}
              </Text>
            )}
          </TouchableOpacity>

          {editandoId !== null && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={resetForm}
            >
              <Text style={styles.cancelText}>Cancelar edición</Text>
            </TouchableOpacity>
          )}

          <View style={{ height: 20 }} />
        </>
      )}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            {item.direccion ? <Text style={styles.itemSub}>{item.direccion}</Text> : null}
            {item.ciudad ? (
              <Text style={styles.itemSub}>
                {item.ciudad}, {item.pais}
              </Text>
            ) : null}
            {item.telefono ? <Text style={styles.itemSub}>📞 {item.telefono}</Text> : null}
            {item.email ? <Text style={styles.itemSub}>✉️ {item.email}</Text> : null}
            {item.sitioWeb ? <Text style={styles.itemSub}>🌐 {item.sitioWeb}</Text> : null}
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
    />
  );
};

export default ManagePublishersScreen;
