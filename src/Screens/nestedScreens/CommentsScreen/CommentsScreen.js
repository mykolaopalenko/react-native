import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   View,
   Image,
   TextInput,
   TouchableWithoutFeedback,
   KeyboardAvoidingView,
   Platform,
   Keyboard,
   TouchableOpacity,
   FlatList,
   Text,
   Dimensions,
} from 'react-native';

import { db } from '../../../firebase/config';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

import { Feather } from '@expo/vector-icons';
import { styles } from './CommentsScreen.styled';

const CommentsScreen = ({ route }) => {
   const { name, userId } = useSelector(state => state.auth.user);
   const { idPost, photoUri } = route.params;
   const [comment, setComment] = useState('');
   const [comments, setComments] = useState([]);
   const userPhotoUri = useSelector(state => state.auth.user.photoUri);

   const [isShowKeyboard, setIsShowKeyboard] = useState(false);

   const [dimensions, setDimension] = useState(Dimensions.get('window').width);

   const keyboardHide = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
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
      Keyboard.addListener('keyboardDidHide', () => {
         keyboardHide();
      });
      return () => {
         Keyboard.removeAllListeners('keyboardDidHide');
      };
   }, [keyboardHide]);

   useEffect(() => {
      getAllComments();
   }, []);

   const createComments = async () => {
      const result = {
         userId,
         userName: name,
         comment,
         dateComment: Date.now(),
         userPhotoUri: userPhotoUri ? userPhotoUri : null,
      };

      await updateDoc(doc(db, 'posts', `${idPost}`), {
         comments: arrayUnion(result),
      });
      keyboardHide();
      setComment('');
   };

   const getAllComments = async () => {
      onSnapshot(doc(db, 'posts', `${idPost}`), doc => {
         const postComments = doc.data().comments;
         postComments && setComments(postComments);
      });
   };

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
               <Image
                  source={{ uri: photoUri }}
                  style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
               />
            </KeyboardAvoidingView>

            {comments.length > 0 && (
               <FlatList
                  data={comments}
                  keyExtractor={item => item.dateComment.toString()}
                  renderItem={({ item }) => {
                     const newDate = new Date(item.dateComment);
                     const date = newDate.toLocaleString();

                     return (
                        <View style={styles.commentWrapper}>
                           <View style={styles.commentIcon}>
                              {item.userPhotoUri && (
                                 <Image
                                    source={{ uri: item.userPhotoUri }}
                                    style={styles.commentPhoto}
                                 />
                              )}
                           </View>
                           <View style={styles.commentTextWrapper}>
                              <Text style={styles.commentText}>{item.comment}</Text>
                              <Text style={styles.commentDate}>{date}</Text>
                           </View>
                        </View>
                     );
                  }}
               />
            )}
            <View>
               <TextInput
                  style={styles.input}
                  placeholder={'Коментувати...'}
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={value => {
                     setComment(value);
                  }}
                  value={comment}
               />
               <TouchableOpacity
                  onPress={createComments}
                  activeOpacity={0.7}
                  style={styles.inputBtn}
               >
                  <Feather name="arrow-up" size={24} color="#FFFFFF" />
               </TouchableOpacity>
            </View>
         </View>
      </TouchableWithoutFeedback>
   );
};

export default CommentsScreen;
