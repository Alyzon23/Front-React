import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import LoginStyles from '../styles/LoginStyles';
import apiClient from '../api/axiosConfig'; // Importamos el cliente axios configurado
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      // Primero, intentemos verificar la conexión con el servidor
      try {
        await apiClient.get('/api/test');
        console.log('Conexión al servidor exitosa');
      } catch (testError) {
        console.log('Error en la prueba de conexión:', testError);
        // Continuamos con el login de todos modos
      }

      // Usamos la ruta correcta para el login
      const response = await apiClient.post('/api/auth/login', {
        username: identifier,
        password,
      });

      if (response.status === 200 && response.data.token) {
        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
        
        // Guardar el username - si viene en la respuesta, usamos ese, si no, usamos el que ingresó el usuario
        const username = response.data.username || identifier;
        await AsyncStorage.setItem('username', username);

        Alert.alert('¡Inicio de sesión exitoso!', 'Bienvenido');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Respuesta del servidor inválida');
        console.error('Respuesta inesperada:', response.data);
      }
    } catch (error) {
      console.error('Error completo:', error);
      
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Datos de respuesta:', error.response.data);
        console.error('Estado HTTP:', error.response.status);
        
        if (error.response.status === 401) {
          Alert.alert('Error', 'Usuario o contraseña incorrectos');
        } else {
          Alert.alert('Error del servidor', 
            `${error.response.data || 'Ocurrió un problema.'} (Código: ${error.response.status})`);
        }
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.error('No se recibió respuesta:', error.request);
        Alert.alert('Error de conexión', 
          'No se pudo conectar con el servidor. Verifica que el servidor esté en ejecución y tu conexión a internet.');
      } else {
        // Algo ocurrió al configurar la solicitud
        console.error('Error de configuración:', error.message);
        Alert.alert('Error', `Error al configurar la solicitud: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Bienvenido</Text>
      <Text style={LoginStyles.subtitle}>Inicia sesión para continuar</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Usuario o Email"
        placeholderTextColor="#aaa"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
        <Text style={LoginStyles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator size="large" color="#1e88e5" />}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={LoginStyles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <View style={LoginStyles.dividerContainer}>
        <View style={LoginStyles.divider} />
        <Text style={LoginStyles.dividerText}>O</Text>
        <View style={LoginStyles.divider} />
      </View>
      <TouchableOpacity style={LoginStyles.googleButton}>
        <Text style={LoginStyles.buttonText}>Continuar con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={LoginStyles.registerText}>
          ¿No tienes una cuenta? <Text style={LoginStyles.highlightText}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;