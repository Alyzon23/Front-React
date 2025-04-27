import React from 'react';
import { View, Text } from 'react-native';
import UserInfoStyles from '../styles/UserInfoStyles';

const UserInfoScreen = () => {
  const user = {
    name: 'Joselyn Ramirez',
    email: 'josdi1@gmail.com',
    username: 'joselynm',
  };

  return (
    <View style={UserInfoStyles.container}>
      <Text style={UserInfoStyles.title}>Información del Usuario</Text>
      <Text style={UserInfoStyles.text}>Nombre: {user.name}</Text>
      <Text style={UserInfoStyles.text}>Email: {user.email}</Text>
      <Text style={UserInfoStyles.text}>Nombre de Usuario: {user.username}</Text>
    </View>
  );
};

export default UserInfoScreen;