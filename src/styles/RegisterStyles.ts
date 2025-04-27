import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd', // Fondo claro y agradable para la pantalla de registro
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e88e5', // Color primario azul
    marginBottom: 20, // Espaciado más amplio para mayor claridad
  },
  input: {
    width: '100%', // Asegura que los campos llenen todo el ancho disponible
    height: 50,
    borderWidth: 1,
    borderColor: '#bbdefb', // Bordes azul claro
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10, // Espaciado interno del texto
    fontSize: 16,
    color: '#1e88e5', // Texto azul
    backgroundColor: '#ffffff', // Fondo blanco limpio para los inputs
  },
  registerButton: {
    backgroundColor: '#1e88e5', // Botón azul primario
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000', // Efecto de sombra para mayor visibilidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4, // Sombra en Android
  },
  googleButton: {
    backgroundColor: '#db4437', // Color rojo para el botón de Google
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff', // Texto blanco para buen contraste
    fontSize: 16,
    fontWeight: 'bold',
  },
  haveAccountText: {
    fontSize: 16,
    color: '#90caf9', // Azul claro para el texto complementario
    marginTop: 10,
  },
  highlightText: {
    color: '#1e88e5', // Azul primario para resaltar palabras
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#bbdefb', // Color de las líneas divisorias
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#90caf9', // Azul claro para el texto del divisor
  },
});

export default RegisterStyles;