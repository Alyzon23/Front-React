import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import ForgotPasswordStyles from '../styles/ForgotPasswordStyles'; // Importar estilos

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendEmail = () => {
    if (email) {
      setIsCodeSent(true);
      Alert.alert('Correo enviado', `Se ha enviado un código a ${email}`);
    } else {
      Alert.alert('Error', 'Por favor ingresa un email válido');
    }
  };

  const handleVerifyCode = () => {
    if (code === '123456') {
      Alert.alert('Código verificado', 'Puedes restablecer tu contraseña.');
      navigation.navigate('ResetPassword');
    } else {
      Alert.alert('Error', 'El código ingresado es incorrecto');
    }
  };

  return (
    <View style={ForgotPasswordStyles.container}>
      <Text style={ForgotPasswordStyles.title}>Recuperar Contraseña</Text>
      {!isCodeSent ? (
        <>
          <TextInput
            style={ForgotPasswordStyles.input}
            placeholder="Ingresa tu email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={ForgotPasswordStyles.sendButton} onPress={handleSendEmail}>
            <Text style={ForgotPasswordStyles.buttonText}>Enviar Código</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={ForgotPasswordStyles.input}
            placeholder="Ingresa el código recibido"
            placeholderTextColor="#aaa"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity style={ForgotPasswordStyles.verifyButton} onPress={handleVerifyCode}>
            <Text style={ForgotPasswordStyles.buttonText}>Verificar Código</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;