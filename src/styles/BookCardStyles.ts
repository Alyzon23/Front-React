import { StyleSheet } from 'react-native';

const BookCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#388e3c',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#757575',
  },
});

export default BookCardStyles;