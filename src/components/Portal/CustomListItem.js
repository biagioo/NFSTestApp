import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

const CustomListItem = ({ index, user, chat, prioritizeChat }) => {
  const auth = useSelector(state => state.auth);
  const { name, uid, nfsCode, vinNumber, email, profilePic } = user;
  const [unreadMsg, setUnreadMsg] = useState(null);

  useLayoutEffect(() => {
    let customerEmail;
    let adminEmail;

    if (nfsCode === 'NFS_AP!') {
      customerEmail = auth.email;
    } else {
      customerEmail = email;
    }

    if (nfsCode === 'NFS_CP!') {
      adminEmail = auth.email;
    } else {
      adminEmail = email;
    }

    const unsubscribe = firebase
      .firestore()
      .collection('groups')
      .doc(customerEmail)
      .collection('conversations')
      .doc(adminEmail)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot =>
        setUnreadMsg(
          snapshot.docs.find(
            doc => doc.data().toRead === false && doc.data().to === auth.name
          )
        )
      );

    return unsubscribe;
  }, [auth, email]);

  return (
    <ListItem onPress={() => chat(user)} key={index} bottomDivider>
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
        {/* {unreadMsg !== undefined ? showMsgNoti() : null} */}
        <ListItem.Title style={{ fontWeight: '800' }}>{name}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {nfsCode === 'NFS_AP!' ? 'Admin' : `Vin Number: ${vinNumber}`}
        </ListItem.Subtitle>
        {unreadMsg != null ? (
          <View style={styles.newMsgNotificationCircle}></View>
        ) : null}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

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
