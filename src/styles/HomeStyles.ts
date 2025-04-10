import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#4caf50',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  bookList: {
    paddingBottom: 20,
  },
  bookContainer: {
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
  bookImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  bookDetails: {
    flex: 1,
    padding: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#388e3c',
    marginBottom: 4,
  },
  bookInfo: {
    fontSize: 12,
    color: '#757575',
  },
});

export default HomeStyles;