import React from 'react';
import { View, TextInput } from 'react-native';
import SearchBarStyles from '../styles/SearchBarStyles';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={SearchBarStyles.container}>
      <TextInput
        style={SearchBarStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default SearchBar;