import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Modal,
  Alert,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import { signOut, getRealtimeUsers, editUser } from '../../../actions';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import firebase from 'firebase';
import { screenHeight, screenWidth } from '../../../GlobalStyles';
import EditProfile from '../../../components/Portal/EditProfile';

const AdminProfile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const { name, email, vinNumber, nfsCode, profilePic, uid, phoneNumber } =
    auth;
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const responseListener = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRealtimeUsers(nfsCode));
  }, []);

  useEffect(() => {
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener(notification => {
    //     dispatch(newNotification(true));
    //   });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('response', response);
      });
  }, []);

  useEffect(() => {
    if (auth.token === '' || auth.token === undefined) {
      registerForPushNotificationsAsync();
    }
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
        .child(`admin-${email}/${new Date().toISOString()}`);
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

  const submitProfileChanges = (
    email,
    password,
    name,
    vinNumber,
    phoneNumber
  ) => {
    const userNewInfo = {
      email,
      password,
      name,
      vinNumber,
      phoneNumber,
    };
    dispatch(editUser(userNewInfo))
      .then(() => {
        console.log('great success?');
      })
      .catch(error => alert(error.message));
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
          icon={{ name: 'users', type: 'font-awesome' }}
          style={styles.profilePic}
          source={{ uri: profilePic }}
          title='Loading Picture...'
        />
      )}

      <ScrollView style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.subTitle}>Last 6 of Vin Number: {vinNumber}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subTitle}>Your email is: {email}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subTitle}>Phone Number: {phoneNumber}</Text>
        </View>
        {uploading ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
            <Button
              buttonStyle={styles.button}
              title='Sign Out'
              onPress={signOutUser}
            />
            <Button
              buttonStyle={styles.button}
              title='Edit My Info'
              onPress={() => setEditModalOpen(true)}
            />
          </>
        )}
      </ScrollView>
      <Modal visible={editModalOpen}>
        <EditProfile
          userName={name}
          userImage={image}
          userEmail={email}
          userVinNumber={vinNumber}
          userPhoneNumber={phoneNumber}
          userProfilePic={profilePic}
          pickImage={pickImage}
          setEditModalOpen={setEditModalOpen}
          submitProfileChanges={submitProfileChanges}
        />
      </Modal>
    </View>
  );
};

export default AdminProfile;

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
    color: 'white',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: Platform.OS === 'android' ? '5%' : '10%',
  },
  profilePic: {
    alignSelf: 'center',
    position: 'absolute',
    width: screenWidth / 2,
    height: screenHeight / 6.2,
    marginTop: Platform.OS === 'android' ? '17%' : '20%',
  },
  body: {
    flex: 2,
  },
  info: {
    height: '20%',
    borderRadius: 60,
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: '2%',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: screenWidth - 60,
    justifyContent: 'center',
    backgroundColor: '#ADB1BB',
  },
  subTitle: {
    fontSize: 22,
    padding: 2,
  },
  button: {
    margin: '5%',
    backgroundColor: 'rgba(0, 0, 13, 0.76)',
  },
  editPicBtn: {
    zIndex: 2,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  editModal: {
    flex: 1,
  },
  modalBckBtn: {
    zIndex: 1,
    width: 40,
    height: 40,
    marginLeft: '4%',
    marginTop: '10%',
  },
  modalInfo: {
    borderRadius: 60,
    marginBottom: '5%',
    alignSelf: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: screenWidth - 60,
    height: screenHeight / 17,
    backgroundColor: '#ADB1BB',
  },
});
