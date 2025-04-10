import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GenrePickerStyles from '../styles/GenrePickerStyles';

const GenrePicker = ({ selectedValue, onValueChange, genres }) => {
  return (
    <View style={GenrePickerStyles.container}>
      <Picker
        selectedValue={selectedValue}
        style={GenrePickerStyles.picker}
        onValueChange={onValueChange}>
        {genres.map((genre) => (
          <Picker.Item key={genre} label={genre} value={genre} />
        ))}
      </Picker>
    </View>
  );
};

export default GenrePicker;