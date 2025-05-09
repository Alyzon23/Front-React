// src/styles/ManageAuthorsStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2D42',
    margin: 16,
    textAlign: 'center',
  },
  list: {
    flexGrow: 0,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  authorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#FF4C4C',
    fontWeight: 'bold',
    marginTop: 4,
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2B2D42',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    color: '#999',
    fontStyle: 'italic',
  },
});
