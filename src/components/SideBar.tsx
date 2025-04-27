import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import SidebarStyles from '../styles/SidebarStyles';
import apiClient from '../api/axiosConfig'; // Importamos el cliente axios configurado
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0));
  const [user, setUser] = useState({ name: '', image: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');

        if (!username) {
          console.error('Username no encontrado en almacenamiento');
          return;
        }

        // Usamos la ruta correcta para obtener datos del usuario
        const response = await apiClient.get(`/api/auth1/usuario/${username}`);

        setUser({
          name: response.data.name || response.data.username || username,
          image: response.data.image || 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
        });
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        if (error.response) {
          console.error('Datos de respuesta:', error.response.data);
          console.error('Estado HTTP:', error.response.status);
        } else if (error.request) {
          console.error('No se recibió respuesta:', error.request);
        } else {
          console.error('Error de configuración:', error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(menuHeight, {
      toValue: isExpanded ? 0 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={SidebarStyles.container}>
      <TouchableOpacity onPress={toggleMenu} style={SidebarStyles.hamburgerButton}>
        <View style={SidebarStyles.hamburgerLine} />
        <View style={SidebarStyles.hamburgerLine} />
        <View style={SidebarStyles.hamburgerLine} />
      </TouchableOpacity>

      <Animated.View style={[SidebarStyles.menu, { height: menuHeight }]}>
        <Image style={SidebarStyles.profileImage} source={{ uri: user.image }} />
        <Text style={SidebarStyles.profileName}>{user.name}</Text>
        
        <TouchableOpacity style={SidebarStyles.link} onPress={() => alert('Usuario')}>
          <Text style={SidebarStyles.linkText}>Usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={SidebarStyles.link} onPress={() => alert('Top 10 Libros')}>
          <Text style={SidebarStyles.linkText}>Top 10 Libros Más Leídos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={SidebarStyles.link} onPress={() => alert('Soporte')}>
          <Text style={SidebarStyles.linkText}>Soporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={SidebarStyles.link} onPress={() => alert('Reseñas')}>
          <Text style={SidebarStyles.linkText}>Reseñas</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Sidebar;