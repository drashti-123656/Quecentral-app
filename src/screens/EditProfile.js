import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RegionPicker from '../components/picker/RegionPicker';
import {COLORS} from './../utils/theme';
import {BASE_URL} from './../utils/global';
import LoginButton from './../components/button/LoginButton';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import {updateUser as updateUserAPI} from '../services/api';

const EditProfile = ({route}) => {
  const {userDetails} = route.params;

  const [name, setName] = useState(userDetails.name);
  const [mobileno, setMobileno] = useState(userDetails.mobileno);
  const [email, setEmail] = useState(userDetails.email);
  const [State, setState] = useState({id: userDetails.state_id, name: ''});
  const [city, setCity] = useState({id: userDetails.city_id, name: ''});
  const [address, setAddress] = useState(userDetails.address);
  const [postalCode, setPostalCode] = useState(userDetails.pincode);
  const [ProfilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(userDetails);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    let formdata = new URLSearchParams({
      name: name,
      email: email,
      address: address,
      mobileno: mobileno,
      state_id: State.id,
      city_id: city.id,
      user_currency: 'INR',
      pincode: postalCode,
      type: 1,
    });
    let response = await updateUserAPI(formdata);

    if (response.data.response.response_code == 200) {
      showMessage({
        message: response.data.response.response_message,
        type: 'info',
        backgroundColor: COLORS.warningGreen,
      });
    } else {
      showMessage({
        message: response.data.response.response_message,
        type: 'info',
        backgroundColor: COLORS.warningGreen,
      });
    }
    setLoading(false);
  };

  const handleChooseProfilePic = () => {
    launchImageLibrary({noData: true, includeBase64: true}, response => {
      console.log(response);
      if (response) {
        setProfilePic(response);
      }
    });
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.container}>
      <View style={{...styles.rowCont, marginVertical: 20}}>
        <View>
          {userDetails.profile_img == '' ? (
            <Image
              source={require('./../assets/icons/user.png')}
              style={{...styles.profilePic, marginRight: 20}}
            />
          ) : (
            <Image
              source={{uri: `${BASE_URL}${userDetails.profile_img}`}}
              style={{...styles.profilePic, marginRight: 20}}
            />
          )}
          <TouchableOpacity
            onPress={handleChooseProfilePic}
            style={{
              position: 'absolute',
              width: 100,
              height: 100,
              backgroundColor: '#333',
              opacity: 0.5,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}>
            <Image
              source={require('./../assets/icons/camera.png')}
              style={{width: 40, height: 40, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <CustomInputWithTitle
            title={'Email'}
            placeholder={userDetails.email}
            value={email}
            editable={false}
          />
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <CustomInputWithTitle
          title={'Name'}
          placeholder={'Edit name'}
          value={name}
          onChangeText={setName}
          editable={false}
        />

        <CustomInputWithTitle
          title={'Mobile number'}
          placeholder={'Enter mobile number'}
          value={mobileno}
          onChangeText={setMobileno}
          editable={false}
        />

        <CustomInputWithTitle
          title={'Address'}
          placeholder={'Enter address'}
          value={address}
          onChangeText={setAddress}
        />

        <RegionPicker
          title={'states'}
          mode={'states'}
          value={State}
          onSelect={setState}
          queryString={101}
        />

       <View style={{opacity: (Object.keys(State).length === 0) ? 0.5 : 1 }}>
        <RegionPicker
          title={'City'}
          mode={'city'}
          value={city}
          onSelect={setCity}
          queryString={State.id}
          editable={(Object.keys(State).length === 0) ? false : true }
        />
</View>
        <CustomInputWithTitle
          title={'Postal code'}
          placeholder={'Enter postal code'}
          value={postalCode}
          onChangeText={setPostalCode}
        />

        <View style={{marginBottom:20, marginTop:10}}>
          <LoginButton
            title={'Update'}
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  h2: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2BBBA0',
  },
});
