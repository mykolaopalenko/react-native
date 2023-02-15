import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../../../redux/auth/authOperations';
import { takeAvatar } from '../../../helpers/uploadAvatarToServer';

import {
   Text,
   View,
   Image,
   ImageBackground,
   TouchableOpacity,
   Platform,
   KeyboardAvoidingView,
   Keyboard,
   TouchableWithoutFeedback,
   Dimensions,
} from 'react-native';

import Input from '../../../Components/Input/Input';
import ButtonSubmit from '../../../Components/ButtonSubmit/ButtonSubmit';
import { styles } from './RegistrationScreen.styled';
import { Formik } from 'formik';
import { registrationValidationSchema } from './registrationValidationSchema';

const RegistrationScreen = ({ navigation }) => {
   const [photoUri, setPhotoUri] = useState(null);
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const [isHidePassword, setIsHidePassword] = useState(true);
   const [dimensions, setDimension] = useState(Dimensions.get('window').width);

   const dispatch = useDispatch();

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

   const toggleShowPassword = () => {
      setIsHidePassword(prev => !prev);
   };

   const uploadAvatarToServer = async () => {
      const avatar = await takeAvatar();
      setPhotoUri(avatar);
   };

   return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
         <View style={styles.container}>
            <ImageBackground
               style={styles.image}
               source={require('../../../../assets/images/mountain.jpg')}
            >
               <KeyboardAvoidingView
                  behavior={Platform.OS == 'ios' ? 'padding' : ''}
               >
                  <View style={styles.wrapper}>
                     <View style={styles.userPhoto}>
                        {photoUri && (
                           <Image source={{ uri: photoUri }} style={styles.avatar} />
                        )}
                        <TouchableOpacity
                           style={styles.btnAdd}
                           activeOpacity={0.7}
                           onPress={uploadAvatarToServer}
                        >
                           <Image
                              source={require('../../../../assets/images/Union.png')}
                              style={styles.addIcon}
                           />
                        </TouchableOpacity>
                     </View>
                     <Text style={styles.headerTitle}>Реєстрація</Text>
                     <Formik
                        validationSchema={registrationValidationSchema}
                        initialValues={{ name: '', email: '', password: '' }}
                        onSubmit={values => {
                           keyboardHide();
                           dispatch(registration({ ...values, photoUri }));
                        }}
                     >
                        {({
                           handleChange,
                           handleBlur,
                           handleSubmit,
                           values,
                           errors,
                           touched,
                        }) => (
                           <View
                              style={{
                                 ...styles.form,
                                 paddingBottom: isShowKeyboard ? 32 : 78,
                                 width: dimensions,
                              }}
                           >
                              <View
                                 style={{
                                    position: 'relative',
                                 }}
                              >
                                 <Input
                                    name="name"
                                    placeholder={'Логін'}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                 />
                                 {touched.name && errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                 )}
                              </View>
                              <View
                                 style={{
                                    position: 'relative',
                                 }}
                              >
                                 <Input
                                    name="email"
                                    placeholder="Адреса електронної пошти"
                                    stylesProp={{ marginTop: 16 }}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                 />
                                 {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                 )}
                              </View>

                              <View
                                 style={{
                                    position: 'relative',
                                 }}
                              >
                                 <Input
                                    name="password"
                                    placeholder={'Пароль'}
                                    stylesProp={{ marginTop: 16 }}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    secureTextEntry={isHidePassword}
                                 />

                                 <TouchableOpacity
                                    style={styles.btnShowPassword}
                                    onPress={toggleShowPassword}
                                    activeOpacity={0.7}
                                 >
                                    <Text style={styles.btnShowPasswordText}>
                                       {isHidePassword ? 'Показати' : 'Приховати'}
                                    </Text>
                                 </TouchableOpacity>
                                 {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                 )}
                              </View>

                              {!isShowKeyboard && (
                                 <View>
                                    <ButtonSubmit
                                       title={'Зареєструватися'}
                                       onPress={handleSubmit}
                                    />
                                    <Text style={styles.linkText}>
                                       Вже є акаунт?{' '}
                                       <Text
                                          onPress={() => navigation.navigate('Login')}
                                          style={styles.linkText}
                                       >
                                          Увійти
                                       </Text>
                                    </Text>
                                 </View>
                              )}
                           </View>
                        )}
                     </Formik>
                  </View>
               </KeyboardAvoidingView>
            </ImageBackground>
         </View>
      </TouchableWithoutFeedback>
   );
};

export default RegistrationScreen;
