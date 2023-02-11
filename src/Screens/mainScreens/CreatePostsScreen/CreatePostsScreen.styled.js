import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  imageWrapper: {
    justifyContent: 'center',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    marginTop: 32,
  },
  camera: {},

  photoBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 240 / 2 - 30,
    left: 320 / 2,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  cameraWrapper: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 240 / 2 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  textAddImg: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  inputWrapper: {
    position: 'relative',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 16,
  },
  btnWrapper: {
    marginTop: 32,
    justifyContent: 'center',
  },
  btnSubmit: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    paddingVertical: 16,
  },
  btnSubmitText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  deleteBtnWrapper: {
    alignItems: 'center',
    // marginTop: 120,
    marginBottom: 34,
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});
