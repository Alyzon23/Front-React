import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#bbdefb',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#1e88e5',
    backgroundColor: '#ffffff',
  },
  registerButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#db4437',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  haveAccountText: {
    fontSize: 16,
    color: '#90caf9',
    marginTop: 10,
  },
  highlightText: {
    color: '#1e88e5',
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
    backgroundColor: '#bbdefb',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#90caf9',
  },
});

export default RegisterStyles;