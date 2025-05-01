// App.tsx (raíz del proyecto)
import React from 'react';
import { NavigationContainer }        from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen           from './src/screens/LoginScreen';
import HomeScreen            from './src/screens/HomeScreen';
import RegisterScreen        from './src/screens/RegisterScreen';
import ForgotPasswordScreen  from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen   from './src/screens/ResetPasswordScreen';

import UserInfoScreen        from './src/screens/UserInfoScreen';
import TopBooksScreen        from './src/screens/TopBooksScreen';
import SupportScreen         from './src/screens/SupportScreen';
import ReviewsScreen         from './src/screens/ReviewsScreen';

// 1) Definimos el tipo de parámetros de cada ruta:
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  UserInfo: { userName: string };   // recibe userName
  TopBooks: undefined;
  Support: undefined;
  Reviews: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">

      {/* Login y Home sin header nativo */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      {/* Rutas del SideBar */}
      <Stack.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={({ route }) => ({
          title: route.params.userName,      // usa el nombre de usuario como título
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="TopBooks"
        component={TopBooksScreen}
        options={{ title: 'Top 10 Libros', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: 'Soporte', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{ title: 'Reseñas', headerTitleAlign: 'center' }}
      />

      {/* Otras pantallas de autenticación */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Registro' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Recuperar contraseña' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Restablecer contraseña' }}
      />

    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
