import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Buffer } from 'buffer';                    // ← polyfill de Buffer
import LoginStyles from '../styles/LoginStyles';
import apiClient   from '../api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JwtPayload {
  sub: string;    // username
  role?: string;  // "ROLE_USER" o "ROLE_ADMIN"
}

// Polyfill global de Buffer (UNA SOLA VEZ en un punto de entrada)
// global.Buffer = global.Buffer || Buffer;

function parseJwt(token: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('JWT inválido');
  let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const json = Buffer.from(b64, 'base64').toString('utf8');
  return JSON.parse(json);
}

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password,   setPassword]   = useState('');
  const [isLoading,  setIsLoading]  = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    setIsLoading(true);
    try {
      // Ping opcional al backend
      await apiClient.get('/api/test').catch(() => {});

      // LOGIN
      const res = await apiClient.post('/api/auth/login', {
        username: identifier,
        password,
      });

      if (res.status === 200 && res.data.token) {
        const token = res.data.token as string;
        await AsyncStorage.setItem('token', token);

        // Extraer username + role
        const { sub: username, role: maybeRole } = parseJwt(token);
        const role = maybeRole ?? 'ROLE_USER';

        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('role', role);

        Alert.alert('¡Bienvenido!', `Hola ${username}`);

        // Navegación condicional
        navigation.reset({
          index: 0,
          routes: [{ name: role === 'ROLE_ADMIN' ? 'AdminHome' : 'Home' }],
        });
      } else {
        Alert.alert('Error', 'Respuesta inesperada del servidor.');
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          Alert.alert('Credenciales inválidas', 'Usuario o contraseña incorrectos.');
        } else {
          Alert.alert(
            'Error del servidor',
            `${err.response.data || 'Error interno.'} (Código ${err.response.status})`
          );
        }
      } else if (err.request) {
        Alert.alert('Sin conexión', 'No se pudo conectar al servidor.');
      } else {
        Alert.alert('Error', err.message);
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
        autoCapitalize="none"
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

      <TouchableOpacity
        style={LoginStyles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="#fff" />
          : <Text style={LoginStyles.buttonText}>Iniciar Sesión</Text>
        }
      </TouchableOpacity>

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

      <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
        <Text style={LoginStyles.registerText}>
          ¿No tienes cuenta? <Text style={LoginStyles.highlightText}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
