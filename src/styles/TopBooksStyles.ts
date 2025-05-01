import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // Header con Sidebar y título LYXA
  headerContainer: {

    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B2D42',
  },

  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    paddingHorizontal: 16,
    paddingTop: 0, // el espacio superior lo aporta headerContainer
  },

  // Título de sección
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2B2D42',
    marginBottom: 16,
    textAlign: 'center',
  },

  // FlatList content container
  list: {
    paddingBottom: 24,
  },

  // Card de cada libro
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // Elevación Android
    elevation: 3,
  },

  // Wrapper de la imagen (para placeholder)
  bookImageWrapper: {
    width: 80,
    height: 120,
    backgroundColor: '#e1e5ee',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Información de texto al lado
  bookInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  bookName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B2D42',
  },
});
