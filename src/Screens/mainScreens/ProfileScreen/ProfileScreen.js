import React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons';
import { styles } from './ProfileScreen.styled';

const posts = {
  id: '1',
  title: 'Flowers',
  likesCount: 8,
  comments: 4,
  location: 'Odesa, Ukraine',
};

const ProfileScreen = ({ navigation }) => {
  const [dimensions, setDimension] = useState(Dimensions.get('window').width);

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
                console.log('logout');
              }}
            />
          </View>
          <View style={styles.userPhoto}>
            <Image
              source={require('../../../assets/images/avatar.png')}
              style={styles.addIcon}
            />
            <TouchableOpacity
              style={styles.btnAdd}
              activeOpacity={0.7}
              onPress={() => {
                console.log('remove photo');
              }}
            >
              <Image
                source={require('../../../assets/images/remove.png')}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Natali Romanova</Text>

          <View style={styles.postWrapper}>
            <Image
              source={require('../../../assets/images/img.jpg')}
              style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
            />
            <Text style={styles.postTitle}>{posts.title}</Text>
            <View style={styles.linksWrapper}>
              <View style={styles.wrap}>
                <TouchableOpacity
                  style={styles.link}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Comments');
                  }}
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={{ ...styles.count, marginLeft: 6 }}>
                    {posts.comments}
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
                  <Text style={styles.count}>{posts.likesCount}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Map');
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>{posts.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
