import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LoginStyles from '../styles/LoginStyles'; // Importar los estilos

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if ((identifier === 'admin' || identifier === 'admin@example.com') && password === '1234') {
      Alert.alert('¡Login exitoso!', `Bienvenido, ${identifier}`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Usuario, email o contraseña incorrectos');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
      <TouchableOpacity onPress={handleForgotPassword}>
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
      <TouchableOpacity onPress={handleRegister}>
        <Text style={LoginStyles.registerText}>
          ¿No tienes una cuenta? <Text style={LoginStyles.highlightText}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;