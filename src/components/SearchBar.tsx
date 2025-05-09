// src/components/SideBar.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/axiosConfig';
import SidebarStyles from '../styles/SidebarStyles';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';  // mismo folder

// Definimos el tipo de la navegación
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SideBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuHeight] = useState(() => new Animated.Value(0));
  const [user, setUser] = useState({ name: '', image: '' });

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (!username) return;

        const response = await apiClient.get(`/api/auth/usuarios/${username}`);
        setUser({
          name: response.data.name ?? response.data.username ?? username,
          image:
            response.data.image ??
            'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
        });
      } catch (error: any) {
        console.error('Error al obtener datos del usuario:', error);
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
};

export default SideBar;
