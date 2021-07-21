import React, { useEffect } from 'react';
import { Button, Image, View } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../views/theme';

const ImagePicker = ({ image, setImage }) => {

  useEffect(() => {
    (async () => {
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 130, width: 130, position: 'relative', marginTop: 20 }}>
      <Ionicons style={{ position: 'absolute', bottom: 0, right: 0}} name="camera" size={30} color="white" onPress={pickImage} />
      {image ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 100, borderColor: theme.activeWhite, borderWidth: 1 }} />
        : <View style={{borderRadius: 50, width: 100, height: 100, borderColor: theme.activeWhite, borderWidth: 1}}/>}
    </View>
  );
}

export default ImagePicker