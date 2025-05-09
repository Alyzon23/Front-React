// src/screens/RequestAdminScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../api/config';
import RegisterStyles from '../styles/RegisterStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestAdminScreen() {
  const handleRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api.post(
        API_ENDPOINTS.REQUEST_ADMIN,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Listo', 'Se solicitó tu código. Revisa el correo del admin.');
    } catch (e: any) {
      Alert.alert('Error', e.response?.data || 'No se pudo solicitar código');
    }
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Solicitar rol ADMIN</Text>
      <TouchableOpacity
        style={RegisterStyles.registerButton}
        onPress={handleRequest}
      >
        <Text style={RegisterStyles.buttonText}>
          Solicitar código de admin
        </Text>
      </TouchableOpacity>
    </View>
  );
}
