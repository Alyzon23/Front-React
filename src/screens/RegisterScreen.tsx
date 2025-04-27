import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegisterStyles from '../styles/RegisterStyles'; // Archivo de estilos importado
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8080/api/auth1/registro', {
        username,
        email,
        password,
        nombre,
        apellidos,
        role: 'ROLE_USER', // Rol predeterminado
      });

      if (response.status === 200) {
        Alert.alert('¡Registro exitoso!', 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.');
        navigation.navigate('Login'); // Redirección al login
      }
    } catch (error) {
      // Manejo de errores
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', error.response.data);
      } else if (error.response && error.response.status === 403) {
        Alert.alert('Error', 'Acceso prohibido. Verifica la configuración del backend.');
      } else {
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    }
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
        keyboardType="email-address"
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
      <TextInput
        style={RegisterStyles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={RegisterStyles.input}
        placeholder="Apellidos"
        placeholderTextColor="#aaa"
        value={apellidos}
        onChangeText={setApellidos}
      />
      <TouchableOpacity style={RegisterStyles.registerButton} onPress={handleRegister}>
        <Text style={RegisterStyles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;