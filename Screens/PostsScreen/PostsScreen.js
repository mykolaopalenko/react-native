import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

import { styles } from './PostsScreen.styled';
import { Feather } from '@expo/vector-icons';

const user = {
  name: 'Natali Romanova',
  email: 'email@example.com',
};

const posts = [
  {
    id: '1',
    title: 'Mountains',
    commentsCount: 1,
    location: 'Ivano-Frankivsk Region, Ukraine',
  },
  {
    id: '2',
    title: 'Flowers',
    commentsCount: 8,
    location: 'Kyiv Region, Ukraine',
  },
];

const PostsScreen = () => {
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
      <View style={styles.userInfo}>
        <Image
          style={styles.userPhoto}
          source={require('../../assets/images/avatar.png')}
        />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image
              source={require('../../assets/images/img.jpg')}
              style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
            />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.wrapper}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => {
                  console.log('comments');
                }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.countComments, marginLeft: 6 }}>
                  {item.commentsCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => {
                  console.log('map');
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>{item.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PostsScreen;
