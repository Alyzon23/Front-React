// src/screens/RoleSelectionScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LoginStyles from '../styles/LoginStyles';

const RoleSelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View style={LoginStyles.container}>
    <Text style={LoginStyles.title}>¿Cómo quieres registrarte?</Text>

    <TouchableOpacity
      style={LoginStyles.loginButton}
      onPress={() => navigation.navigate('Register')}
    >
      <Text style={LoginStyles.buttonText}>Registrarse como Usuario</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[LoginStyles.loginButton, { marginTop: 16 }]}
      onPress={() => navigation.navigate('AdminRegister')}
    >
      <Text style={LoginStyles.buttonText}>Registrarse como Administrador</Text>
    </TouchableOpacity>
  </View>
);

export default RoleSelectionScreen;
