import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './ButtonSubmit.styled';

const ButtonSubmit = ({ title, onPress, stylesProp }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...styles.btn, stylesProp }}
      onPress={onPress}
    >
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSubmit;
