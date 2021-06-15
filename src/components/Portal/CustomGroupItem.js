import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

const CustomGroupItem = ({ groupInfo, index, chat }) => {
  const auth = useSelector(state => state.auth);
  const [unreadMsg, setUnreadMsg] = useState(null);
  const { profilePic, customerName, customerVinNumb, newMsg, customerUid } =
    groupInfo;
  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('groups')
      .doc(customerUid)
      .onSnapshot(snapshot => {
        if (snapshot.data().newMsg === true) {
          setUnreadMsg(true);
        } else if (snapshot.data().newMsg === false) {
          setUnreadMsg(false);
        }
      });
    return unsubscribe;
  }, [firebase]);
  return (
    <ListItem onPress={() => chat(groupInfo)} key={index} bottomDivider>
      {profilePic ? (
        <Avatar
          rounded
          source={{
            uri: profilePic,
          }}
        />
      ) : (
        <Avatar
          rounded
          source={{
            uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
          }}
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {customerName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {`Vin Number: ${customerVinNumb}`}
        </ListItem.Subtitle>
        {unreadMsg != false ? (
          <View style={styles.newMsgNotificationCircle}></View>
        ) : null}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomGroupItem;

const styles = StyleSheet.create({
  newMsgNotificationCircle: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 80,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
