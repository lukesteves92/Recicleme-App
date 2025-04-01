import * as ImagePicker from 'expo-image-picker';

export const takePhotoFromCamera = async () => {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) return null;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  return result.cancelled ? null : result.uri;
};
