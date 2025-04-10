import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import ResetPasswordStyles from '../styles/ResetPasswordStyles'; // Importar estilos

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      Alert.alert('Contraseña restablecida', 'Tu contraseña ha sido actualizada exitosamente.');
      navigation.navigate('Login'); // Redirigir al login después del cambio
    } else {
      Alert.alert('Error', 'Las contraseñas no coinciden. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <View style={ResetPasswordStyles.container}>
      <Text style={ResetPasswordStyles.title}>Restablecer Contraseña</Text>
      <TextInput
        style={ResetPasswordStyles.input}
        placeholder="Nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={ResetPasswordStyles.input}
        placeholder="Confirmar nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={ResetPasswordStyles.resetButton} onPress={handleResetPassword}>
        <Text style={ResetPasswordStyles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;