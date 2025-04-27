import { StyleSheet } from 'react-native';

const TopBooksStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // Fondo blanco para destacar los libros
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 10,
    textAlign: 'center',
  },
  book: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f7f7fc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  bookName: {
    fontSize: 16,
    color: '#2b2d42',
  },
});

export default TopBooksStyles;