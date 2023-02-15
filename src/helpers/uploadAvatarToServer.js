import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '../firebase/config';

export const takeAvatar = async () => {
   let image = null;
   let imageUri = null;

   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   });

   if (!result.canceled) {
      image = result.assets[0].uri;
   }

   imageUri = await uploadPhotoToServer(image);
   return imageUri;
};

const uploadPhotoToServer = async image => {
   const response = await fetch(image);
   const file = await response.blob();

   const uniquePostId = Date.now().toString();

   const pathPhoto = `userImage/${uniquePostId}.jpg`;

   const photoRef = ref(storage, pathPhoto);

   const uploadPhoto = await uploadBytes(photoRef, file, {
      contentType: 'image/jpeg',
   });

   const processedPhoto = await getDownloadURL(uploadPhoto.ref);
   return processedPhoto;
};
