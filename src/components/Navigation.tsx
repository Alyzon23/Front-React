// src/components/Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import TopBooksScreen from '../screens/TopBooksScreen';
import SupportScreen from '../screens/SupportScreen';
import ReviewsScreen from '../screens/ReviewsScreen';

export type RootStackParamList = {
  Home: undefined;
  UserInfo: undefined;
  TopBooks: undefined;
  Support: undefined;
  Reviews: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* ← Aquí le quitas el header nativo */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name="UserInfo"
          component={UserInfoScreen}
          options={{ title: 'Usuario' }}
        />
        <Stack.Screen
          name="TopBooks"
          component={TopBooksScreen}
          options={{ title: 'Top 10 Libros' }}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ title: 'Soporte' }}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
          options={{ title: 'Reseñas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
