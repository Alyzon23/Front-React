// src/styles/UserInfoStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E5EC',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    // espacio horizontal permite alinear bien
  },
  // Botón hamburguesa + LYXA + Inicio
  homeButton: {
    marginLeft: 'auto',           // empuja a la derecha
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'transparent', // sin color de fondo
    zIndex: 1010,                 // encima del resto
  },
  homeButtonText: {
    color: '#1B9C85',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B2D42',
    marginLeft: 199,   // separa del botón Inicio
    zIndex: 1000,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2B2D42',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2B2D42',
    textAlign: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#F0F0F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#2B2D42',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
