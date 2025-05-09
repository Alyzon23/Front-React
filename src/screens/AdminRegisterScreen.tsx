// src/screens/AdminRegisterScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegisterStyles from '../styles/RegisterStyles';
import apiClient from '../api/axiosConfig';
import { API_ENDPOINTS } from '../api/config';

const AdminRegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername]       = useState('');
  const [email, setEmail]             = useState('');
  const [nombre, setNombre]           = useState('');
  const [apellidos, setApellidos]     = useState('');
  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);

  const handleAdminRegister = async () => {
    if (!username || !email || !nombre || !apellidos || !password || !confirmPassword) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Las contraseñas no coinciden');
    }

    setLoading(true);
    try {
      await apiClient.post(API_ENDPOINTS.REGISTER_ADMIN, {
        username,
        email,
        nombre,
        apellidos,
        password
      });

      Alert.alert(
        '¡Solicitud enviada!',
        'Revisa tu correo (jmr.dicao@yavirac.edu.ec) para obtener el código.',
        [{ text: 'OK', onPress: () => navigation.navigate('ValidateAdmin', { username }) }]
      );
    } catch (e: any) {
      const msg = e.response?.data || 'No se pudo solicitar el permiso';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Registro Administrador</Text>

      {/* Usuario */}
      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Email */}
      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Nombre */}
      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      {/* Apellidos */}
      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Apellidos"
          placeholderTextColor="#aaa"
          value={apellidos}
          onChangeText={setApellidos}
        />
      </View>

      {/* Contraseña */}
      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPwd}
          value={password}
          onChangeText={setPassword}
        />
        {password.length > 0 && (
          <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
            <Icon
              name={showPwd ? 'eye-off' : 'eye'}
              size={24}
              style={RegisterStyles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Confirmar contraseña */}
      <View style={RegisterStyles.inputContainer}>
        <TextInput
          style={RegisterStyles.input}
          placeholder="Repetir contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirm}
        />
        {confirmPassword.length > 0 && (
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Icon
              name={showConfirm ? 'eye-off' : 'eye'}
              size={24}
              style={RegisterStyles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={RegisterStyles.registerButton}
        onPress={handleAdminRegister}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={RegisterStyles.buttonText}>Solicitar Permiso</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

export default AdminRegisterScreen;
