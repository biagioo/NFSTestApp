import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Keyboard,
  Alert,
  Image,
  Text,
  View,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';

const CustomerChatScreen = props => {
  const auth = useSelector(state => state.auth);
  const { name, email, token, profilePic } = props.route.params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('groups')
      .doc(auth.email)
      .collection('conversations')
      .doc(email)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [auth]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const convertDate = utcSeconds => {
    const myDate = new Date(utcSeconds * 1000);
    return myDate.toLocaleString();
  };

  const uploadImage = async () => {
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
      .child(`Admin-${name}`)
      .child(`customer-${auth.email}/${new Date().toISOString()}`);
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

          submitMsg(url);

          return url;
        });
      }
    );
  };

  const submitMsg = imageUrl => {
    Keyboard.dismiss();
    firebase
      .firestore()
      .collection('groups')
      .doc(auth.email)
      .collection('conversations')
      .doc(email)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: auth.uid,
        from: auth.name,
        to: name,
        name: auth.name,
        email: auth.email,
        toRead: false,
        image: imageUrl,
      })
      .then(() => {
        console.log('Post added!!');
        setInput('');
        setImage(null);
        sendNotification(token);
      })
      .catch(e => {
        console.log('error!!!!', e);
      });
  };

  const sendMessage = () => {
    if (input === '') {
      Alert.alert('Warning', 'Message Cannot be blank');
    }

    if (image === null && input !== '') {
      Keyboard.dismiss();
      firebase
        .firestore()
        .collection('groups')
        .doc(customerEmail)
        .collection('conversations')
        .doc(auth.email)
        .collection('messages')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          uid: auth.uid,
          from: auth.name,
          to: name,
          name: auth.name,
          email: auth.email,
          toRead: false,
        })
        .then(() => {
          sendNotification(token, input);
        });
      setInput('');
    }
    if (image !== null && input !== '') {
      uploadImage();
      sendNotification(token, input);
    }
  };

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

  const takePic = async () => {
    let result = await ImagePicker.launchCameraAsync({
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

  const readMsg = docId => {
    firebase
      .firestore()
      .collection('groups')
      .doc(auth.email)
      .collection('conversations')
      .doc(email)
      .collection('messages')
      .doc(`${docId}`)
      .update({
        toRead: true,
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch(error => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
  const sendNotification = async (token, body) => {
    const message = {
      to: token,
      sound: 'default',
      title: `${auth.name}`,
      body,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip,deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const saveImageToDevice = imageUrl => {
    console.log('see the saveImageToDevice function');
    // need a uri not a url Sadge
    // MediaLibrary.saveToLibraryAsync(imageUrl);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
      }}
    >
      <StatusBar style='dark' />
      <View style={styles.header}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign name='leftcircleo' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{name}</Text>
        </View>
        <TouchableOpacity
          style={styles.cameraRollBtn}
          onPress={image ? () => setImage('') : pickImage}
          activeOpacity={0.5}
        >
          {image ? (
            <Text>Clear Image</Text>
          ) : (
            <Ionicons name='images-outline' size={24} color='#595757' />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={image ? () => setImage('') : takePic}
          activeOpacity={0.5}
        >
          {image ? null : <Ionicons name='camera' size={24} color='#595757' />}
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{ paddingTop: 15 }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {messages.map(({ id, data }) =>
                data.email === auth.email ? (
                  <View key={id}>
                    <View style={styles.sender}>
                      <Avatar
                        position='absolute'
                        bottom={-15}
                        right={-5}
                        rounded
                        size={30}
                        source={{
                          uri: auth.profilePic,
                        }}
                      />
                      {data.image ? (
                        <TouchableOpacity activeOpacity={0.5}>
                          <Image
                            source={{ uri: data.image }}
                            style={{ width: 200, height: 200, marginLeft: 10 }}
                          />
                        </TouchableOpacity>
                      ) : null}
                      <Text style={styles.senderText}>{data.message}</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        alignSelf: 'flex-end',
                        fontWeight: '400',
                        paddingRight: '5%',
                      }}
                    >
                      {data.timestamp
                        ? convertDate(data.timestamp.seconds)
                        : 'loading...'}
                    </Text>
                  </View>
                ) : (
                  <View key={id}>
                    {data.toRead === false ? readMsg(id) : null}
                    <View style={styles.reciever}>
                      <Avatar
                        position='absolute'
                        bottom={-15}
                        left={-5}
                        rounded
                        size={30}
                        source={{
                          uri: profilePic,
                        }}
                      />
                      {data.image ? (
                        <TouchableOpacity activeOpacity={0.5}>
                          <Image
                            source={{ uri: data.image }}
                            style={{ width: 200, height: 200, marginLeft: 10 }}
                          />
                        </TouchableOpacity>
                      ) : null}
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        alignSelf: 'flex-start',
                        fontWeight: '400',
                        paddingLeft: '5%',
                      }}
                    >
                      {data.timestamp
                        ? convertDate(data.timestamp.seconds)
                        : 'loading...'}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
          </>
        </TouchableWithoutFeedback>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginLeft: 10 }}
          />
        ) : null}
        <View style={styles.footer}>
          <TextInput
            value={input}
            onChangeText={text => setInput(text)}
            multiline={true}
            placeholder='NFS Performance'
            style={styles.textInput}
            onSubmitEditing={sendMessage}
            allowFontScaling={true}
          />
          {!uploading ? (
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name='send' size={24} color='#595757' />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size='large' color='#000' />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '5%',
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    width: '100%',
    paddingHorizontal: '2%',
  },
  backBtn: {
    paddingLeft: '2%',
    flex: 1,
  },
  cameraRollBtn: {
    padding: 10,
    justifyContent: 'flex-end',
  },
  cameraBtn: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sender: {
    padding: 15,
    marginRight: 15,
    borderRadius: 20,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
    alignSelf: 'flex-end',
    backgroundColor: '#5273ab',
  },
  senderText: {
    marginLeft: 10,
    color: 'white',
    fontWeight: '500',
  },
  reciever: {
    margin: 15,
    padding: 15,
    maxWidth: '80%',
    borderRadius: 20,
    position: 'relative',
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  recieverName: {
    marginLeft: 10,
    fontSize: 12,
    color: 'white',
  },
  recieverText: {
    color: 'black',
    marginLeft: 10,
    fontWeight: '500',
  },
  footer: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    bottom: 0,
    height: 40,
    padding: 10,
    color: 'grey',
    marginRight: 15,
    borderRadius: 30,
    backgroundColor: '#ECECEC',
  },
});
