import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { styles } from './ProfileScreen.styled';
import { logout, updateUserAvatar } from '../../../redux/auth/authOperations';
import { takeAvatar } from '../../../helpers/uploadAvatarToServer';

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [dimensions, setDimension] = useState(Dimensions.get('window').width);

  const { userId, name, photoUri } = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const getUserPosts = async () => {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', `${userId}`)
    );
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach(doc => {
      const post = { ...doc.data(), idPost: doc.id };
      result.push(post);
    });
    result.sort((a, b) => b.datePost - a.datePost);
    setPosts(result);
  };

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
    getUserPosts();
  }, []);

  const updateAvatar = async () => {
    const newPhotoUri = await takeAvatar();
    dispatch(updateUserAvatar({ newPhotoUri }));
  };
  const removeAvatar = async () => {
    dispatch(updateUserAvatar({ newPhotoUri: null }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../../assets/images/mountain.jpg')}
      >
        <View style={styles.wrapper}>
          <View style={styles.logoutBtn}>
            <Feather
              name="log-out"
              color="#BDBDBD"
              size={24}
              onPress={() => {
                dispatch(logout());
              }}
            />
          </View>
          <View style={styles.avatarWrapper}>
            {photoUri ? (
              <>
                <Image source={{ uri: photoUri }} style={styles.avatar} />
                <TouchableOpacity
                  style={styles.btnAdd}
                  activeOpacity={0.7}
                  onPress={removeAvatar}
                >
                  <Image
                    source={require('../../../assets/images/remove.png')}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={{ ...styles.btnAdd, borderColor: '#FF6C00' }}
                  activeOpacity={0.7}
                  onPress={updateAvatar}
                >
                  <Image
                    source={require('../../../assets/images/Union.png')}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.headerTitle}>{name}</Text>

          <View style={styles.postWrapper}>
            <FlatList
              data={posts}
              keyExtractor={item => item.idPost}
              renderItem={({ item }) => (
                <View style={styles.listWrapper}>
                  <Image
                    source={{ uri: item.photoUri }}
                    style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
                  />
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <View style={styles.linksWrapper}>
                    <View style={styles.wrap}>
                      <TouchableOpacity
                        style={styles.link}
                        activeOpacity={0.7}
                        onPress={() => {
                          navigation.navigate('Comments', {
                            idPost: item.idPost,
                            photoUri: item.photoUri,
                            title: item.title,
                          });
                        }}
                      >
                        <Feather
                          name="message-circle"
                          size={24}
                          color="#BDBDBD"
                        />
                        <Text style={{ ...styles.count, marginLeft: 6 }}>
                          {item.comments?.length || 0}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ ...styles.link, marginLeft: 24 }}
                        activeOpacity={0.7}
                        onPress={() => {
                          console.log('Like');
                        }}
                      >
                        <EvilIcons name="like" size={35} color="#BDBDBD" />
                        <Text style={styles.count}>{140}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.link}
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate('Map', {
                          latitude: item.location.latitude,
                          longitude: item.location.longitude,
                          place: item.location.place,
                        });
                      }}
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.locationText}>
                        {item.location.place}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
