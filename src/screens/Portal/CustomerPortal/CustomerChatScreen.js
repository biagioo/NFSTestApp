import React, { useState, useLayoutEffect, useRef } from 'react';
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
  Image,
  Text,
  View,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';

const CustomerChatScreen = props => {
  const auth = useSelector(state => state.auth);
  const { name, email, token, profilePic } = props.route.params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

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

  const sendMessage = () => {
    Keyboard.dismiss();
    if (input !== '') {
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
          email: auth.email,
        })
        .then(() => {
          sendNotification(token, input);
        });
      setInput('');
    }
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

  const goBack = () => {
    props.navigation.goBack();
  };
  const convertDate = utcSeconds => {
    const myDate = new Date(utcSeconds * 1000);
    return myDate.toLocaleString();
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
                      <Text style={styles.recieverText}>{data.message}</Text>
                      {data.image ? (
                        <TouchableOpacity
                          onPress={() => saveImageToDevice(data.image)}
                          activeOpacity={0.5}
                        >
                          <Image
                            source={{ uri: data.image }}
                            style={{ width: 200, height: 200, marginLeft: 10 }}
                          />
                        </TouchableOpacity>
                      ) : null}
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
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name='send' size={24} color='#595757' />
          </TouchableOpacity>
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
    justifyContent: 'space-evenly',
  },
  backBtn: {
    paddingLeft: '2%',
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
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
