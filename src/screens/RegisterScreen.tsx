import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegisterStyles from '../styles/RegisterStyles'; // Importar los estilos

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada.');
    navigation.navigate('Login'); // Redirigir al login después del registro
  };

  const handleGoogleRegister = () => {
    Alert.alert('Google Registro', 'Función simulada: Continuar con Google.');
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Regístrate</Text>
      <TextInput
        style={RegisterStyles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={RegisterStyles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={RegisterStyles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={RegisterStyles.registerButton} onPress={handleRegister}>
        <Text style={RegisterStyles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
      <View style={RegisterStyles.dividerContainer}>
        <View style={RegisterStyles.divider} />
        <Text style={RegisterStyles.dividerText}>O</Text>
        <View style={RegisterStyles.divider} />
      </View>
      <TouchableOpacity style={RegisterStyles.googleButton} onPress={handleGoogleRegister}>
        <Text style={RegisterStyles.buttonText}>Continuar con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={RegisterStyles.haveAccountText}>
          ¿Ya tienes cuenta? <Text style={RegisterStyles.highlightText}>Ingresa aquí</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;