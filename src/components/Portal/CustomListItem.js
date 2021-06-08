import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

const CustomListItem = ({ index, user, chat }) => {
  const auth = useSelector(state => state.auth);
  const { name, uid, nfsCode, vinNumber, email, profilePic } = user;
  const [unreadMsg, setUnreadMsg] = useState(null);

  useLayoutEffect(() => {
    let customerUid;
    let adminUid;

    if (nfsCode === 'NFS_AP!') {
      customerUid = auth.uid;
    } else {
      customerUid = uid;
    }

    if (nfsCode === 'NFS_CP!') {
      adminUid = auth.uid;
    } else {
      adminUid = uid;
    }

    const unsubscribe = firebase
      .firestore()
      .collection('groups')
      .doc(customerUid)
      .collection('conversations')
      .doc(adminUid)
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
