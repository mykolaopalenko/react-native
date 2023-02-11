import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { styles } from './CommentsScreen.styled';

const CommentsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
          <Image
            source={require('../../../assets/images/img.jpg')}
            style={styles.postPhoto}
          />

          <View>
            <TextInput
              style={styles.input}
              placeholder={'Коментувати...'}
              placeholderTextColor={'#BDBDBD'}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputBtn}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
