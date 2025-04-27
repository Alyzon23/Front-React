import { StyleSheet } from 'react-native';

const SidebarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 1,
    left: 1, // Ubicación en la esquina superior izquierda
    zIndex: 25, // Asegura que el sidebar esté siempre visible
  },
  hamburgerButton: {
    width: 40,
    height: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2b2d42',
    borderRadius: 5,
    padding: 5,
  },
  hamburgerLine: {
    width: 30,
    height: 3,
    backgroundColor: '#ffffff',
  },
  menu: {
    marginTop: 1,
    backgroundColor: 'rgba(46, 46, 78, 0.85)', // Fondo translúcido
    borderRadius: 10,
    width: 250,
    overflow: 'hidden',
    elevation: 10, // Sombra para profundidad
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Imagen circular
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileName: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: '500',
  },
});

export default SidebarStyles;