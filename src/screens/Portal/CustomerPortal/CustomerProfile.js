import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut, getRealtimeUsers } from '../../../actions';
import { screenHeight, screenWidth } from '../../../GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network Request Failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
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
            firebase.firestore().collection('users').doc(uid).set(
              {
                profilePic: url,
              },
              { merge: true }
            );
            setUploading(false);
            Alert.alert(
              'Upload Success',
              'Your new Profile Picture is now set!'
            );
            blob.close();

            return url;
          });
        }
      );
    }
  };

  const signOutUser = () => {
    dispatch(signOut());
    navigation.replace('Log In');
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <LinearGradient
        start={{ x: 1, y: 2 }}
        end={{ x: 1, y: 0 }}
        colors={['rgba(6, 0, 0, 0.23)', 'rgba(0, 0, 13, 0.65)']}
        style={styles.background}
      />
      <Text numberOfLines={1} style={styles.title}>{`Welcome, ${name}.`}</Text>

      {image ? (
        <Avatar
          rounded
          size='large'
          style={styles.profilePic}
          source={{ uri: image }}
        />
      ) : (
        <Avatar
          size='large'
          rounded
          style={styles.profilePic}
          source={{ uri: profilePic }}
          title='Loading Picture...'
        />
      )}

      <View style={styles.body}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subTitle}>Last 6 of Vin Number: {vinNumber}</Text>
          <Text style={styles.subTitle}>Your email is: {email}</Text>
        </View>
        {uploading ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
            <Button
              buttonStyle={styles.button}
              title='Pick a new Profile Pic'
              onPress={pickImage}
            />

            <Button
              buttonStyle={styles.button}
              title='Sign Out'
              onPress={signOutUser}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '40%',
  },
  title: {
    fontSize: 26,
    marginTop: Platform.OS === 'android' ? '5%' : '10%',
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
  },
  profilePic: {
    height: screenHeight / 5.2,
    width: screenWidth / 2,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? '17%' : '10%',
  },
  body: {
    flex: 2,
  },
  subtitleContainer: {
    justifyContent: 'space-between',
  },
  subTitle: {
    fontSize: 22,
    borderWidth: 1,
    borderColor: 'rgba(6, 0, 0, 0.23)',
    padding: 2,
  },
  button: {
    margin: '5%',
    backgroundColor: 'rgba(0, 0, 13, 0.76)',
  },
});
