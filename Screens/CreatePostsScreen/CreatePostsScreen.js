import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { styles } from './CreatePostsScreen.styled';

const CreatePostsScreen = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [isReadySubmit, setIsReadySubmit] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [dimensions, setDimension] = useState(Dimensions.get('window').width);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (photoUri && title && location) {
      setIsReadySubmit(true);
    } else setIsReadySubmit(false);
  }, [photoUri, title, location]);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setDimension(width);
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener?.('change', onChange);
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      keyboardHide();
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [keyboardHide]);

  const onSubmit = () => {
    console.log('create Post');
  };

  const onDeletePost = () => {
    setPhotoUri(null);
    setTitle(null), setLocation(null);
    console.log('delete post');
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View>
          <View>
            <View
              style={{ ...styles.imageWrapper, width: dimensions - 16 * 2 }}
            >
              {photoUri ? (
                <>
                  <Image
                    source={require('../../assets/images/img.jpg')}
                    style={{
                      width: dimensions - 16 * 2,
                      height: 240,
                    }}
                  />
                  <TouchableOpacity
                    style={styles.photoBtn}
                    activeOpacity={0.7}
                    onPress={() => {
                      console.log('add photo');
                    }}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.cameraWrapper}>
                  <TouchableOpacity
                    style={styles.cameraBtn}
                    activeOpacity={0.7}
                    onPress={() => {
                      console.log('add photo');
                    }}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={styles.textAddImg}>Завантажити фото</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          >
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                value={title}
                onChangeText={value => {
                  setTitle(value);
                }}
              />
              <View style={styles.inputWrapper}>
                <View style={styles.locationIcon}>
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                </View>
                <TextInput
                  style={{
                    ...styles.input,
                    paddingLeft: 32,
                  }}
                  placeholder="Місцевість..."
                  value={location}
                  onChangeText={value => {
                    setLocation(value);
                  }}
                />
              </View>
            </View>
            <View style={styles.btnWrapper}>
              {!isShowKeyboard && (
                <TouchableOpacity
                  disabled={!isReadySubmit}
                  activeOpacity={0.7}
                  style={{
                    ...styles.btnSubmit,

                    backgroundColor: !isReadySubmit ? '#F6F6F6' : '#FF6C00',
                  }}
                  onPress={() => {
                    onSubmit();
                  }}
                >
                  <Text
                    style={{
                      ...styles.btnSubmitText,
                      color: !isReadySubmit ? '#BDBDBD' : '#ffffff',
                    }}
                  >
                    Опублікувати
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.deleteBtnWrapper}>
          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.7}
            onPress={onDeletePost}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
