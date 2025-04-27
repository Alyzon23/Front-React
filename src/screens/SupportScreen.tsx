import React from 'react';
import { View, Text } from 'react-native';
import SupportStyles from '../styles/SupportStyles';

const SupportScreen = () => {
  return (
    <View style={SupportStyles.container}>
      <Text style={SupportStyles.title}>Soporte</Text>
      <Text style={SupportStyles.text}>
        Para ayuda técnica, contáctanos en support@lyxa.com
      </Text>
    </View>
  );
};

export default SupportScreen;