import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

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

const DefaultScreenPosts = ({ navigation }) => {
   const { name, email, photoUri } = useSelector(state => state.auth.user);
   const [posts, setPosts] = useState([]);
   const [dimensions, setDimension] = useState(Dimensions.get('window').width);

   const getAllPosts = async () => {
      onSnapshot(collection(db, 'posts'), doc => {
         const result = [];
         doc.docs.forEach(doc => {
            const post = { ...doc.data(), idPost: doc.id };
            result.push(post);
         });
         result.sort((a, b) => b.datePost - a.datePost);
         setPosts(result);
      });
   };

   useEffect(() => {
      getAllPosts();
   }, []);

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
            {photoUri && (
               <Image style={styles.userPhoto} source={{ uri: photoUri }} />
            )}
            <View>
               <Text style={styles.userName}>{name}</Text>
               <Text style={styles.userEmail}>{email}</Text>
            </View>
         </View>

         <FlatList
            data={posts}
            keyExtractor={item => item.idPost}
            renderItem={({ item }) => (
               <View style={{ marginBottom: 32 }}>
                  <Image
                     source={{ uri: item.photoUri }}
                     style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
                  />
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <View style={styles.wrapper}>
                     <TouchableOpacity
                        style={styles.link}
                        activeOpacity={0.7}
                        onPress={() =>
                           navigation.navigate('Comments', {
                              idPost: item.idPost,
                              photoUri: item.photoUri,
                              title: item.title,
                           })
                        }
                     >
                        <Feather name="message-circle" size={24} color="#BDBDBD" />
                        <Text style={{ ...styles.countComments, marginLeft: 6 }}>
                           {item.comments?.length || 0}
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
