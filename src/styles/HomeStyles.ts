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
  adminPanel: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#d32f2f'
  },
  adminButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adminButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 6,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeStyles;