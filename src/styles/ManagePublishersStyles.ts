// src/styles/ManagePublishersStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Este style se aplica a contentContainerStyle de FlatList
  container: {
    padding: 16,
    backgroundColor: '#F7F7F7',
    flexGrow: 1,       // permite que el contenido crezca y scrollee
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B2D42',
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  itemSub: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  actions: {
    justifyContent: 'center',
    marginLeft: 12,
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
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#2B2D42',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    color: '#999999',
    fontStyle: 'italic',
  },
});
