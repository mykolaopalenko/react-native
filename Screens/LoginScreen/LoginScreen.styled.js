import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    marginBottom: 25,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 16,
  },

  btnShowPassword: {
    position: 'absolute',
    right: 16,
    top: 30,
  },
  btnShowPasswordText: {
    fontSize: 16,
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
  btn: {
    borderWidth: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    width: '100%',
    height: 51,

    backgroundColor: '#FF6C00',
    border: 1,
    borderRadius: 100,
    marginBottom: 16,
  },
  btnTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
  },
  linkText: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',

    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    position: 'absolute',
    bottom: -14,
    left: 8,
  },
});
