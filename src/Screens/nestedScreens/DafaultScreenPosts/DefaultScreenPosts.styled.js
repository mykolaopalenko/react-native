import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    marginRight: 8,
    borderRadius: 16,
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
  userName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: '#212121CC',
  },

  postPhoto: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  postTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginBottom: 8,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countComments: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
});
