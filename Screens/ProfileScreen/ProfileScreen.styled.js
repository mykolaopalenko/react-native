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
    marginTop: 60,
    paddingTop: 92,
    alignItems: 'center',
  },
  logoutBtn: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    marginBottom: 33,
    textAlign: 'center',
  },
  userPhoto: {
    height: 120,
    width: 120,
    borderRadius: 16,
    position: 'absolute',
    top: -60,
    backgroundColor: '#F6F6F6',
  },
  btnAdd: {
    height: 25,
    width: 25,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    position: 'absolute',
    bottom: 12,
    right: -12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postWrapper: {
    marginBottom: 35,
  },
  postPhoto: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginBottom: 8,
  },
  linksWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    flexDirection: 'row',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  //----------
  avatar: {
    position: 'absolute',
    right: '50%',
    top: 0,
    transform: [{ translateX: 60 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatarBtn: {
    position: 'absolute',
    bottom: 19,
    left: 105,
    width: 25,
    height: 25,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 75,
    alignItems: 'center',
  },
  userName: {
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 32,
    color: '#212121',
  },
  logoutBtn: {
    position: 'absolute',
    top: 20,
    right: 16,
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
