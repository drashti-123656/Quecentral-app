import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from './../utils/theme';
import { profileDetails } from '../services/api';
import { BASE_URL } from './../utils/global';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { darkTheme, lightTheme } from './../styles/themes';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_THEME } from '../redux/reduxConstants';
import Config from 'react-native-config';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector(({ app }) => app);
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

  const toggleTheme = () => {
    const theme = EStyleSheet.value('$theme') === 'light' ? darkTheme : lightTheme;
    EStyleSheet.build(theme);
    dispatch({ type: TOGGLE_THEME });
  };

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Settings'} />}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.PRIMARY} />
        </View>
      ) : (
        <>
          <View style={{ ...styles.rowCont, marginTop: 20 }}>
            {!userDetails.profile_img ? (
              <Image
                source={require('./../assets/icons/user.png')}
                style={{ ...styles.profilePic, marginRight: 10 }}
              />
            ) : (
              <Image
                source={{ uri: `${Config.BASE_URL}${userDetails.profile_img}` }}
                style={{ ...styles.profilePic, marginRight: 10 }}
              />
            )}

            <View>
              <Text
                style={{
                  ...styles.h1,
                  marginBottom: 5,
                  color: EStyleSheet.value('$WHITE'),
                }}>
                {userDetails.name}
              </Text>
              <View
                style={{
                  ...styles.rowCont,
                  marginBottom: 5,
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="mail-outline"
                  size={22}
                  color={EStyleSheet.value('$WHITE')}
                />
                <Text style={styles.mobileText}>{userDetails.mobileno}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuCont}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', { userDetails })}
              style={{ ...styles.rowCont, ...styles.menuItems }}>
              <View style={styles.iconWrapper}>
                <MaterialIcons
                  name="notifications-active"
                  size={15}
                  color={EStyleSheet.value('$PRIMARY')}
                />
              </View>
              <Text style={styles.h2}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={{ ...styles.rowCont, ...styles.menuItems }}>
              <View style={styles.iconWrapper}>
                <MaterialIcons
                  name="notifications-active"
                  size={15}
                  color={EStyleSheet.value('$PRIMARY')}
                />
              </View>
              <Text style={styles.h2}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('WalletStack')}
              style={{ ...styles.rowCont, ...styles.menuItems }}>
              <View style={styles.iconWrapper}>
                <Icon
                  name="wallet"
                  size={15}
                  color={EStyleSheet.value('$PRIMARY')}
                />
              </View>
              <Text style={styles.h2}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Transactions')}
              style={{
                ...styles.rowCont,
                ...styles.menuItems,
                borderBottomWidth: 1,
              }}>
              <View style={styles.iconWrapper}>
                <Icon
                  name="creditcard"
                  size={15}
                  color={EStyleSheet.value('$PRIMARY')}
                />
              </View>
              <Text style={styles.h2}>Transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Coupon')}
              style={{
                ...styles.rowCont,
                ...styles.menuItems,
                borderBottomWidth: 1,
              }}>
              <View style={styles.iconWrapper}>
                <Icon
                  name="creditcard"
                  size={15}
                  color={EStyleSheet.value('$PRIMARY')}
                />
              </View>
              <Text style={styles.h2}>Coupon</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={toggleTheme}
              style={{
                ...styles.rowCont,
                ...styles.menuItems,
                borderBottomWidth: 0,
                justifyContent: 'space-between'
              }}>
              <View style={styles.rowCont}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name="color-lens"
                    size={15}
                    color={EStyleSheet.value('$PRIMARY')}
                  />
                </View>
                <Text style={styles.h2}>Dark Mode</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: EStyleSheet.value('DARK') }}
                thumbColor={theme === 'dark' ? EStyleSheet.value('DARK') : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={theme === 'dark' ? false : true}
                styles={{ alignSelf: 'flex-end' }}
              />
            </TouchableOpacity> */}
          </View>
        </>
      )}
    </RootScreen>
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
    backgroundColor: '$ALPHA_PRIMARY',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  mobileText: {
    color: '$WHITE',
    paddingLeft: 6,
    fontSize: 15,
  },
});
