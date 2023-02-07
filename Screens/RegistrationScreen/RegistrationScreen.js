import React, { useState, useEffect } from 'react';
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
import Input from '../../Components/Input/Input';
import ButtonSubmit from '../../Components/ButtonSubmit/ButtonSubmit';
import { styles } from './RegistrationScreen.styled';
import { Formik } from 'formik';
import { registrationValidationSchema } from './registrationValidationSchema';

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
              <View style={styles.userPhoto}>
                <TouchableOpacity
                  style={styles.btnAdd}
                  activeOpacity={0.7}
                  onPress={() => {
                    console.log('add photo');
                  }}
                >
                  <Image
                    source={require('../../assets/images/Union.png')}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerTitle}>Реєстрація</Text>
              <Formik
                validationSchema={registrationValidationSchema}
                initialValues={{ login: '', email: '', password: '' }}
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
                        name="login"
                        placeholder={'Логін'}
                        onFocus={() => setIsShowKeyboard(true)}
                        value={values.login}
                        onChangeText={handleChange('login')}
                      />
                      {touched.login && errors.login && (
                        <Text style={styles.errorText}>{errors.login}</Text>
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
