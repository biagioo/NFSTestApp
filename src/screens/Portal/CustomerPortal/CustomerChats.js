import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../actions/group.actions';
import CustomListItem from '../../../components/Portal/CustomListItem';

const CustomerUpdates = ({ navigation }) => {
  const users = useSelector(state => state.group.users);
  // const messages = useSelector(state => state.group.messages);
  const auth = useSelector(state => state.auth);
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

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }

  const chat = user => {
    const groupInfo = {
      adminUid: user.uid,
      adminName: user.name,
      customerUid: auth.uid,
      customerEmail: auth.email,
      customerName: auth.name,
      customerVinNumb: auth.vinNumber,
      token: user.token,
    };

    dispatch(createGroup(groupInfo));
    navigation.navigate('CustomerChatScreen', {
      name: user.name,
      email: user.email,
      token: user.token,
      profilePic: user.profilePic,
      adminUid: user.uid,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollViewContainer}
      >
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
