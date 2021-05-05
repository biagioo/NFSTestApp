import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Keyboard,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import { Picker } from '@react-native-community/picker';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AdminUpdatesScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [post, setPost] = useState('');
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.group.users);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (selectedValue === 'Select a User' || image === null) {
      Alert.alert('Please Select a User and Choose an Image');
    } else {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network Request Failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });

      const ref = firebase
        .storage()
        .ref('images')
        // .child(`Admin-${auth.name}`)
        .child(`customer-${selectedValue}/${new Date().toISOString()}`);
      const snapshot = ref.put(blob);

      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true);
        },
        error => {
          setUploading(false);
          console.log(error);
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then(url => {
            console.log('download url : ', url);
            setUploading(false);
            setImage(null);
            Alert.alert('Upload Succes!', 'Your update has been posted');
            blob.close();

            submitPost(url);

            return url;
          });
        }
      );
    }
  };

  const submitPost = imageUrl => {
    // const imageUrl = await uploadImage();
    // console.log('image URL', imageUrl);

    firebase
      .firestore()
      .collection('posts')
      .doc(`${selectedValue}`)
      .collection('updates')
      .add({
        postedBy: auth.name,
        post,
        postImage: imageUrl,
        postTime: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('Post added!!');
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 70 }}>
        <Text>Pick a Customer to Update</Text>
        <Picker
          mode='dropdown'
          selectedValue={selectedValue}
          style={styles.onePicker}
          itemStyle={styles.onePickerItem}
          onValueChange={itemValue => setSelectedValue(itemValue)}
        >
          <Picker.Item label='Select Customer' value='Select a User' />
          {users.map(user => {
            return (
              <Picker.Item
                key={user.uid}
                label={`${user.name} - Vin#: ${user.vinNumber}`}
                value={user.email}
              />
            );
          })}
        </Picker>
      </View>
      <TouchableWithoutFeedback
        style={{ height: 20, width: 300 }}
        onPress={Keyboard.dismiss}
      ></TouchableWithoutFeedback>
      <View style={{ flex: 4, marginTop: 70 }}>
        <TextInput
          placeholder='Update Caption'
          multiline={true}
          numberOfLines={3}
          value={post}
          onChangeText={text => setPost(text)}
          // onSubmitEditing={submitPost}
        ></TextInput>
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        <Button title='Choose Image...' onPress={pickImage} />
        {!uploading ? (
          <Button title='Post' onPress={uploadImage} />
        ) : (
          <ActivityIndicator size='large' color='#000' />
        )}
      </View>
    </View>
  );
};

export default AdminUpdatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onePicker: {
    width: 400,
    height: 44,
  },
  onePickerItem: {
    height: 44,
    color: 'black',
  },
});
