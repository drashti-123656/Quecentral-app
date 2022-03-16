import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {COLORS} from './../utils/theme';
import {profileDetails} from '../services/api';
import {BASE_URL} from './../utils/global';
import EStyleSheet from 'react-native-extended-stylesheet';

const Settings = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, [isFocused]);

  const fetchUserDetails = async () => {
    setLoading(true);
    let response = await profileDetails();
    if (response.data.response.response_code == 200) {
      setUserDetails(response.data.data);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.PRIMARY} />
        </View>
      ) : (
        <>
          <View style={{...styles.rowCont, marginTop: 20}}>
            {userDetails.profile_img == '' ? (
              <Image
                source={require('./../assets/icons/user.png')}
                style={{...styles.profilePic, marginRight: 10}}
              />
            ) : (
              <Image
                source={{uri: `${BASE_URL}${userDetails.profile_img}`}}
                style={{...styles.profilePic, marginRight: 10}}
              />
            )}

            <View>
              <Text style={{...styles.h1, marginBottom: 5}}>
                {userDetails.name}
              </Text>
              <View style={{...styles.rowCont, marginBottom: 5}}>
                <Image
                  source={require('./../assets/icons/mail.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.PRIMARY,
                    marginRight: 10,
                  }}
                />
                <Text style={styles.emailText}>{userDetails.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {userDetails})
                }
                style={{
                  padding: 10,
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.menuCont}>
            <TouchableOpacity 
             onPress={() => navigation.navigate('Notifications')}
             style={{...styles.rowCont, ...styles.menuItems}}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('./../assets/icons/notification.png')}
                  style={{width: 15, height: 15, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text style={styles.h2}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Wallet')}
              style={{...styles.rowCont, ...styles.menuItems}}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('./../assets/icons/wallet.png')}
                  style={{width: 15, height: 15, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text style={styles.h2}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate('Transactions')}
              style={{
                ...styles.rowCont,
                ...styles.menuItems,
                borderBottomWidth: 0,
              }}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('./../assets/icons/credit-card.png')}
                  style={{width: 15, height: 15, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text style={styles.h2}>Transactions</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Settings;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '$BACKGROUND',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuCont: {
    borderColor: '$ALPHA_TEXT',
    borderWidth: 1,
    backgroundColor: '$CARD_BACKGROUND',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 0,
  },
  menuItems: {
    paddingVertical: 20,
    borderBottomColor: '$ALPHA_TEXT',
    borderBottomWidth: 1,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$TEXT',
  },
  h2: {
    fontWeight: 'bold',
    color: '$TEXT',
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  emailText : {
    color: '$TEXT',
  }
});
