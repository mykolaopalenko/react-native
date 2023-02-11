import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

import { styles } from './DefaultScreenPosts.styled';
import { Feather } from '@expo/vector-icons';

const user = {
  name: 'Natali Romanova',
  email: 'email@example.com',
};

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [route.params, ...prevState]);
    }
  }, [route.params]);

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
          source={require('../../../assets/images/avatar.png')}
        />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image
              source={{ uri: item.photoUri }}
              style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
            />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.wrapper}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Comments')}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.countComments, marginLeft: 6 }}>
                  9
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Map', {
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                    place: item.location.place,
                  })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>{item.location.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultScreenPosts;
