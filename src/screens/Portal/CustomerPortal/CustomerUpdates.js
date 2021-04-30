import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupMessages } from '../../../actions/group.actions';
import CustomListItem from '../../../components/Portal/CustomListItem';

const CustomerUpdates = ({ navigation }) => {
  const users = useSelector(state => state.group.users);
  const messages = useSelector(state => state.group.messages);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }

  const chat = user => {
    dispatch(getGroupMessages(auth.email, user.email));
    navigation.navigate('CustomerChatScreen', { ...user });
  };

  return (
    <SafeAreaView styl={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {users.map((user, index) => (
          <CustomListItem key={index} index={index} user={user} chat={chat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerUpdates;

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
});
