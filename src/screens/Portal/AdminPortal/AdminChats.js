import React, { useEffect, useState, useCallback } from 'react';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import {} from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createGroup } from '../../../actions';
import CustomListItem from '../../../components/Portal/CustomListItem';

const AdminUpdates = ({ navigation }) => {
  const users = useSelector(state => state.group.users);
  const auth = useSelector(state => state.auth);
  const [input, setInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

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
      token: customer.token,
    };

    dispatch(createGroup(groupInfo));
    navigation.navigate('AdminChatScreen', { ...groupInfo });
  };

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={input}
        onChangeText={text => setInput(text)}
        placeholder='Search by Customer Name'
        style={styles.textInput}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.scrollViewContainer}
        >
          {searchedUsers().map((user, index) => (
            <CustomListItem
              key={index}
              index={index}
              user={user}
              chat={initChat}
            />
          ))}
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AdminUpdates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    height: '90%',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  textInput: {
    flex: 1,
    bottom: 0,
    height: 40,
    padding: 10,
    color: 'black',
    // marginRight: 15,
    marginHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#ECECEC',
  },
});
