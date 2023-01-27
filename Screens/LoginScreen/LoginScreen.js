import React, { useState, useEffect } from 'react';
import {Text,View,ImageBackground, TouchableOpacity,
   Platform,
   KeyboardAvoidingView,
   Keyboard,
   TouchableWithoutFeedback,
   Dimensions,
} from 'react-native';
import Input from '../../Components/Input/Input';
import { styles } from './LoginScreen.styled';
import { Formik } from 'formik';
import { loginValidationSchema } from './loginValidationSchema';

const LoginScreen = () => {
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const [isHidePassword, setIsHidePassword] = useState(true);

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
      Keyboard.addListener('keyboardHide', () => {
         keyboardHide();
      });
      return () => {
         Keyboard.removeAllListeners('keyboardHide');
      };
   }, [keyboardHide]);

   const toggleShowPassword = () => {
      setIsHidePassword(prev => !prev);
   };

   return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
         <View style={styles.container}>
            <ImageBackground
               style={styles.image}
               source={require('../../assets/images/mountain.jpg')}
            >
               <KeyboardAvoidingView
                  behavior={Platform.OS == 'ios' ? 'padding' : ''}
               >
                  <View style={styles.wrapper}>
                     <Text style={styles.headerTitle}>Увійти</Text>
                     <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => {
                           keyboardHide();
                           console.log(values);
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
                                 paddingBottom: isShowKeyboard ? 32 : 144,
                                 width: dimensions,
                              }}
                           >
                              <View
                                 style={{
                                    position: 'relative',
                                 }}
                              >
                                 <Input
                                    name="email"
                                    placeholder="Адреса електронної пошти"
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
                                    <TouchableOpacity
                                       activeOpacity={0.8}
                                       style={styles.btn}
                                       onPress={handleSubmit}
                                    >
                                       <Text style={styles.btnTitle}>Увійти</Text>
                                    </TouchableOpacity>


                                    <Text style={styles.linkText}>
                                       Немає акаунта? Зареєструватися
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

export default LoginScreen;
