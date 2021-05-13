import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { signOut, getRealtimeUsers } from '../../../actions';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import firebase from 'firebase';

const CustomerProfile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const { name, email, vinNumber, nfsCode, uid, profilePic } = auth;
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(getRealtimeUsers(nfsCode));
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      if (token) {
        const res = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({ token }, { merge: true });
        res;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };
  const uploadImage = async () => {
    console.log('here');
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
      .ref('images/')
      .child(`profilePictures/`)
      .child(`customer-${email}/${new Date().toISOString()}`);
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
          firebase.firestore().collection('users').doc(uid).set(
            {
              profilePic: url,
            },
            { merge: true }
          );
          setUploading(false);
          Alert.alert('Upload Succes!', 'Your update has been posted');
          blob.close();

          return url;
        });
      }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const signOutUser = () => {
    dispatch(signOut());
    navigation.replace('Log In');
  };

  console.log(profilePic);
  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Text>Customer Profile</Text>
      {profilePic === '' ? (
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../../../../assets/images/avatar.png')}
        />
      ) : (
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: profilePic }}
        />
      )}

      <Button
        style={{ margin: 20 }}
        title='Pick a new Profile Pic'
        onPress={pickImage}
      />
      <Button
        style={{ marginTop: 20 }}
        title='Confirm Profile Pic'
        onPress={uploadImage}
      />
      <Text>Welcome back, {name}</Text>
      <Text>The last 6 digits of your cars Vin are: {vinNumber}</Text>
      <Text>Your email is: {email}</Text>
      <Button title='Sign Out' onPress={signOutUser} />
    </View>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
