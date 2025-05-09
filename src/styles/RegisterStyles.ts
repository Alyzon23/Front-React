import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1976d2',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#90caf9',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1e88e5',
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    marginLeft: 12,
    color: '#1e88e5',
  },
  registerButton: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#1976d2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  haveAccountText: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
  },
  highlightText: {
    color: '#1976d2',
    fontWeight: '700',
  },
});