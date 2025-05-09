// src/screens/AdminHomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from '../../App';
import styles from '../styles/AdminHomeStyles';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'AdminHome'>;

const AdminHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageAuthors')}
      >
        <Text style={styles.buttonText}>✏️ Gestionar Autores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManagePublishers')}
      >
        <Text style={styles.buttonText}>🏢 Gestionar Editoriales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateBook')}
      >
        <Text style={styles.buttonText}>＋ Nuevo Libro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>🚪 Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminHomeScreen;
