// src/screens/ValidateAdminScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegisterStyles from '../styles/RegisterStyles';
import apiClient from '../api/axiosConfig';
import { API_ENDPOINTS } from '../api/config';

const ValidateAdminScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route
}) => {
  const { username } = route.params;
  const [code, setCode] = useState('');

  const handleValidate = async () => {
    if (!code) {
      return Alert.alert('Error', 'Ingresa el código recibido por correo');
    }
    try {
      await apiClient.post(API_ENDPOINTS.VALIDATE_ADMIN, { username, code });
      Alert.alert(
        '¡Éxito!',
        'Ya eres administrador. Inicia sesión.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (e: any) {
      const msg = e.response?.data || 'Código inválido o expirado';
      Alert.alert('Error', msg);
    }
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Validar Código Admin</Text>
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
        onPress={handleValidate}
      >
        <Text style={RegisterStyles.buttonText}>Validar y Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValidateAdminScreen;
