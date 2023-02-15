import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { app, db, storage } from '../../../firebase/config';
import { useSelector } from 'react-redux';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

import { MaterialIcons, Feather } from '@expo/vector-icons';
import { styles } from './CreatePostsScreen.styled';

const CreatePostsScreen = ({ navigation }) => {
  const { userId } = useSelector(state => state.auth.user);
  const { name } = useSelector(state => state.auth.user);
  const [coordinates, setCoordinates] = useState(null);
  const [camera, setCamera] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    place: null,
  });
  const [isReadySubmit, setIsReadySubmit] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [dimensions, setDimension] = useState(Dimensions.get('window').width);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      setCoordinates({ latitude, longitude });
      setLocation(prev => ({ ...prev, latitude, longitude }));
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (photo && title && location.place) {
      setIsReadySubmit(true);
    } else setIsReadySubmit(false);
  }, [photo, title, location]);

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
    uploadPostToServer();
    navigation.navigate('DefaultScreen');
    onDeletePost();
  };

  const onDeletePost = () => {
    setPhoto(null);
    setTitle(null), setLocation({});
  };

  const getLocation = async () => {
    const placePhoto = await Location.reverseGeocodeAsync(coordinates);
    const place = `${placePhoto[0].region}, ${placePhoto[0].country}`;
    setLocation(prev => ({ ...prev, place }));
  };

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    getLocation();
  };

  const uploadPostToServer = async () => {
    const photoUri = await uploadPhotoToServer();
    const datePost = Date.now();
    const docRef = await addDoc(collection(db, 'posts'), {
      photoUri,
      location,
      title,
      userId,
      UserName: name,
      datePost,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const pathPhoto = `postImage/${uniquePostId}.jpg`;

    const photoRef = ref(storage, pathPhoto);

    const uploadPhoto = await uploadBytes(photoRef, file, {
      contentType: 'image/jpeg',
    });

    const processedPhoto = await getDownloadURL(uploadPhoto.ref);
    return processedPhoto;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View>
          <View>
            <View
              style={{ ...styles.imageWrapper, width: dimensions - 16 * 2 }}
            >
              {photo ? (
                <>
                  <Image
                    source={{ uri: photo }}
                    style={{
                      width: dimensions - 16 * 2,
                      height: 240,
                    }}
                  />
                  <TouchableOpacity
                    style={styles.photoBtn}
                    activeOpacity={0.7}
                    onPress={() => {
                      setPhoto(null);
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
                <Camera style={styles.cameraWrapper} ref={setCamera}>
                  <TouchableOpacity
                    style={styles.cameraBtn}
                    activeOpacity={0.7}
                    onPress={() => {
                      takePhoto();
                    }}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                    />
                  </TouchableOpacity>
                </Camera>
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
                  value={location.place}
                  onChangeText={value => {
                    setLocation(prev => ({ ...prev, place: value }));
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
