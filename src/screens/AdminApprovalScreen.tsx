// src/screens/AdminApprovalScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterStyles from '../styles/RegisterStyles';
import axios from 'axios';
import { API_ENDPOINTS } from '../api/config';

const AdminApprovalScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [usernameToApprove, setUsernameToApprove] = useState('');
  const [code, setCode] = useState('');

  const handleApprove = async () => {
    try {
      // Recuperamos el token del storage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No has iniciado sesión');
        return;
      }

      // Llamada para aprobar al usuario
      const response = await axios.post(
        API_ENDPOINTS.APPROVE_ADMIN,
        { username: usernameToApprove, code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Éxito', 'Usuario aprobado como ADMIN');
        navigation.goBack();
      } else {
        Alert.alert('Error', `Código inesperado: ${response.status}`);
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data || 'Ocurrió un error al aprobar el usuario'
      );
    }
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Aprobación de Admin</Text>

      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Usuario a aprobar"
          placeholderTextColor="#aaa"
          value={usernameToApprove}
          onChangeText={setUsernameToApprove}
        />
      </View>

      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Código de aprobación"
          placeholderTextColor="#aaa"
          value={code}
          onChangeText={setCode}
        />
      </View>

      <TouchableOpacity
        style={RegisterStyles.registerButton}
        onPress={handleApprove}
      >
        <Text style={RegisterStyles.buttonText}>Aprobar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminApprovalScreen;
