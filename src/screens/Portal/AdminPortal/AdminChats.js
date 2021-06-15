import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  Keyboard,
  Text,
} from 'react-native';
import {} from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createGroup } from '../../../actions';
import firebase from 'firebase';
import { FAB } from 'react-native-paper';
import CustomListItem from '../../../components/Portal/CustomListItem';
import CustomGroupItem from '../../../components/Portal/CustomGroupItem';

const AdminUpdates = ({ navigation }) => {
  const users = useSelector(state => state.group.users);
  const auth = useSelector(state => state.auth);

  const [input, setInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [changeList, setChangeList] = useState(false);
  const [groups, setGroups] = useState(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    firebase
      .firestore()
      .collection('groups')
      .onSnapshot(snapshot => {
        const groups = [];
        snapshot.forEach(doc => {
          if (doc.data().newMsg === true) {
            groups.push(doc.data());
            setGroups(groups);
          }
        });
      });

    // return unsubscribe;
  }, [firebase]);

  const unreadChat = name => {
    console.log(name);
  };

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(1500).then(() => setRefreshing(false));
  }, []);

  const searchedUsers = () => {
    return users.filter(user =>
      user.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const initChat = customer => {
    const groupInfo = {
      adminId: auth.uid,
      adminName: auth.name,
      customerUid: customer.uid,
      customerEmail: customer.email,
      customerName: customer.name,
      customerVinNumb: customer.vinNumber,
      customerPhone: customer.phoneNumber,
      profilePic: customer.profilePic,
      newMsg: false,
      token: customer.token,
    };

    dispatch(createGroup(groupInfo));
    navigation.navigate('AdminChatScreen', { ...groupInfo });
  };

  const chat = groupInfo => {
    navigation.navigate('AdminChatScreen', { ...groupInfo });
  };

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FAB
        style={styles.fab}
        small
        color='white'
        icon='menu'
        onPress={() => setChangeList(!changeList)}
      />

      {changeList ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.scrollViewContainer}
          >
            {groups === null ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: '700', fontSize: 18 }}>
                  No New Messages, You're Up to Date!
                </Text>
              </View>
            ) : (
              groups.map((groupInfo, index) => (
                <CustomGroupItem
                  key={index}
                  index={index}
                  groupInfo={groupInfo}
                  chat={chat}
                />
              ))
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      ) : (
        <>
          <View style={styles.searchView}>
            <TextInput
              value={input}
              onChangeText={text => setInput(text)}
              placeholder='Search by Customer Name'
              style={styles.textInput}
            />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.scrollViewContainer}
            >
              {searchedUsers().map((user, index) => (
                // console.log('all: ', user),
                <CustomListItem
                  key={index}
                  index={index}
                  user={user}
                  chat={initChat}
                  unreadChat={unreadChat}
                />
              ))}
            </ScrollView>
          </TouchableWithoutFeedback>
        </>
      )}
    </SafeAreaView>
  );
};

export default AdminUpdates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 5,
    backgroundColor: 'black',
  },
  scrollViewContainer: {
    height: '75%',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  searchView: {
    height: '6%',
    // justifyContent: 'flex-end',
  },
  textInput: {
    // flex: 1,
    bottom: 0,
    height: 40,
    padding: 10,
    color: 'black',
    marginHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#ECECEC',
  },
});
