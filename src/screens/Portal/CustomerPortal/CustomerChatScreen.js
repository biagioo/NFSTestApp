import React, { useState, useLayoutEffect } from 'react';
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
  const { name, email } = props.route.params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

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
        });
      setInput('');
    }
  };

  const saveImageToDevice = imageUrl => {
    console.log('see the saveImageToDevice function');
    // need a uri not a url Sadge
    // MediaLibrary.saveToLibraryAsync(imageUrl);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.email ? (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position='absolute'
                      bottom={-15}
                      right={-5}
                      rounded
                      size={30}
                      source={{
                        uri:
                          'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position='absolute'
                      bottom={-15}
                      left={-5}
                      rounded
                      size={30}
                      source={{
                        uri:
                          'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
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
                    {/* <Text style={styles.recieverName}>{data.name}</Text> */}
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
    backgroundColor: '#ECECEC',
  },
  senderText: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '500',
  },
  reciever: {
    margin: 15,
    padding: 15,
    maxWidth: '80%',
    borderRadius: 20,
    position: 'relative',
    alignSelf: 'flex-start',
    backgroundColor: '#5273ab',
  },
  recieverName: {
    marginLeft: 10,
    fontSize: 12,
    color: 'black',
    // zIndex: 2,
  },
  recieverText: {
    color: 'white',
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
