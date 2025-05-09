// src/screens/SideBar.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/axiosConfig';
import SidebarStyles from '../styles/SidebarStyles';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';  // mismo folder

// Tipamos la navegación según tu RootStackParamList
type SidebarNavProp = NativeStackNavigationProp<RootStackParamList>;

const SideBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuHeight]  = useState(() => new Animated.Value(0));
  const [user, setUser] = useState({ name: '', image: '' });

  const navigation = useNavigation<SidebarNavProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (!username) return;

        const { data } = await apiClient.get(`/api/auth/usuarios/${username}`);
        setUser({
          name:  data.name ?? data.username ?? username,
          image: data.image ?? 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
        });
      } catch (e: any) {
        console.error('Error al obtener datos del usuario:', e);
      }
    };
    fetchUserData();
  }, []);

  const toggleMenu = () => {
    Animated.timing(menuHeight, {
      toValue: isExpanded ? 0 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(prev => !prev);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]
    );
  };

  return (
    <View style={SidebarStyles.container}>
      {/* Botón hamburguesa */}
      <TouchableOpacity
        onPress={toggleMenu}
        style={SidebarStyles.hamburgerButton}
      >
        <View style={SidebarStyles.hamburgerLine} />
        <View style={SidebarStyles.hamburgerLine} />
        <View style={SidebarStyles.hamburgerLine} />
      </TouchableOpacity>

      {/* Menú desplegable */}
      <Animated.View style={[SidebarStyles.menu, { height: menuHeight }]}>
        {/* Avatar y nombre */}
        <Image
          source={{ uri: user.image }}
          style={SidebarStyles.profileImage}
        />
        <Text style={SidebarStyles.profileName}>
          {user.name || 'Usuario'}
        </Text>

        {/* Enlaces de navegación */}
        <TouchableOpacity
          style={SidebarStyles.link}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={SidebarStyles.linkText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={SidebarStyles.link}
          onPress={() =>
            navigation.navigate('UserInfo', {
              userName: user.name || 'Usuario'
            })
          }
        >
          <Text style={SidebarStyles.linkText}>Perfil</Text>
        </TouchableOpacity>


        {/* Cerrar sesión */}
        <TouchableOpacity
          style={[SidebarStyles.link, SidebarStyles.logoutLink]}
          onPress={handleLogout}
        >
          <Text style={[SidebarStyles.linkText, SidebarStyles.logoutText]}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SideBar;
