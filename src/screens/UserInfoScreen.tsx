import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../api/axiosConfig';
import SideBar from '../components/SideBar';
import styles from '../styles/UserInfoStyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../components/Navigation'; // Ajusta ruta si hace falta

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface Usuario {
  username: string;
  nombre: string;
  apellidos: string;
  email: string;
  image?: string;
}

const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (!username) {
          Alert.alert('Error', 'No se encontró el nombre de usuario.');
          return setLoading(false);
        }
        const { data } = await axios.get<Usuario>(`/api/auth/usuarios/${username}`);
        setUser(data);
        setForm({ nombre: data.nombre, apellidos: data.apellidos, email: data.email });
      } catch (e: any) {
        console.error('Error al cargar usuario:', e.response || e);
        Alert.alert('Error', 'No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axios.put<Usuario>(
        `/api/auth/usuarios/${user.username}`,
        {
          nombre: form.nombre,
          apellidos: form.apellidos,
          email: form.email,
        }
      );
      Alert.alert('Éxito', 'Perfil actualizado con éxito.');
      setUser({ ...user, ...form });
      setEditMode(false);
    } catch (e: any) {
      console.error('Error en handleSave:', e.response || e);
      const msg = e.response?.data || e.message || 'No se pudo actualizar el perfil.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPress = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas editar tu perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Editar', onPress: () => setEditMode(true) },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2B2D42" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se encontraron datos del usuario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header: Sidebar, Inicio y LYXA */}
      <View style={styles.headerContainer}>
        <SideBar />
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Inicio</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LYXA</Text>
      </View>

      {/* Card con avatar y datos */}
      <View style={styles.card}>
        <Image
          source={{
            uri:
              user.image ??
              'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>
          {user.nombre} {user.apellidos}
        </Text>

        <Text style={styles.label}>Nombre</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={form.nombre}
            onChangeText={text =>
              setForm(f => ({ ...f, nombre: text }))
            }
          />
        ) : (
          <Text style={styles.text}>{user.nombre}</Text>
        )}

        <Text style={styles.label}>Apellidos</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={form.apellidos}
            onChangeText={text =>
              setForm(f => ({ ...f, apellidos: text }))
            }
          />
        ) : (
          <Text style={styles.text}>{user.apellidos}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={form.email}
            onChangeText={text =>
              setForm(f => ({ ...f, email: text }))
            }
          />
        ) : (
          <Text style={styles.text}>{user.email}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={editMode ? handleSave : handleEditPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {editMode ? 'Guardar Cambios' : 'Editar Perfil'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfoScreen;
