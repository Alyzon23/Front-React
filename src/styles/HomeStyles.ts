import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fc', // Fondo claro para enfoque en el contenido
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaciado entre Sidebar y Título
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2d42',
    textAlign: 'right', // Alinea el texto a la derecha
    flex: 1, // Ocupa el espacio restante
  },
});

export default HomeStyles;