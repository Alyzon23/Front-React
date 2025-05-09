// App.tsx (raíz del proyecto)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Buffer } from 'buffer';

// Polyfill de Buffer para parseo de JWT sin librerías extra
global.Buffer = global.Buffer || Buffer;

import LoginScreen            from './src/screens/LoginScreen';
import HomeScreen             from './src/screens/HomeScreen';
import AdminHomeScreen        from './src/screens/AdminHomeScreen';
import UserInfoScreen         from './src/screens/UserInfoScreen';
import TopBooksScreen         from './src/screens/TopBooksScreen';
import SupportScreen          from './src/screens/SupportScreen';
import ReviewsScreen          from './src/screens/ReviewsScreen';
import RegisterScreen         from './src/screens/RegisterScreen';
import ForgotPasswordScreen   from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen    from './src/screens/ResetPasswordScreen';

import RoleSelectionScreen    from './src/screens/RoleSelectionScreen';
import AdminRegisterScreen    from './src/screens/AdminRegisterScreen';
import ValidateAdminScreen    from './src/screens/ValidateAdminScreen';

import CreateBookScreen       from './src/screens/CreateBookScreen';
import ManageAuthorsScreen    from './src/screens/ManageAuthorsScreen';
import ManagePublishersScreen from './src/screens/ManagePublishersScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AdminHome: undefined;
  UserInfo: { userName: string };
  TopBooks: undefined;
  Support: undefined;
  Reviews: undefined;

  RoleSelection: undefined;
  Register: undefined;
  AdminRegister: undefined;
  ValidateAdmin: { username: string };

  CreateBook: undefined;
  ManageAuthors: undefined;
  ManagePublishers: undefined;

  ForgotPassword: undefined;
  ResetPassword: { token: string; username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {/* ——— Autenticación ——— */}
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true, title: 'Registro de Usuario' }}
      />
      <Stack.Screen
        name="AdminRegister"
        component={AdminRegisterScreen}
        options={{ headerShown: true, title: 'Registro de Administrador' }}
      />
      <Stack.Screen
        name="ValidateAdmin"
        component={ValidateAdminScreen}
        options={{ headerShown: true, title: 'Validar Código Admin' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: true, title: 'Olvidé mi Contraseña' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: true, title: 'Restablecer Contraseña' }}
      />

      {/* ——— Panel de Admin ——— */}
      <Stack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ headerShown: true, title: 'Panel de Administración' }}
      />
      <Stack.Screen
        name="CreateBook"
        component={CreateBookScreen}
        options={{ headerShown: true, title: 'Crear Libro' }}
      />
      <Stack.Screen
        name="ManageAuthors"
        component={ManageAuthorsScreen}
        options={{ headerShown: true, title: 'Gestión de Autores' }}
      />
      <Stack.Screen
        name="ManagePublishers"
        component={ManagePublishersScreen}
        options={{ headerShown: true, title: 'Gestión de Editoriales' }}
      />

      {/* ——— Usuario normal ——— */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={{ headerShown: true, title: 'Mi Perfil' }}
      />
      <Stack.Screen
        name="TopBooks"
        component={TopBooksScreen}
        options={{ headerShown: true, title: 'Top 10 Libros' }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ headerShown: true, title: 'Soporte' }}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{ headerShown: true, title: 'Reseñas' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
