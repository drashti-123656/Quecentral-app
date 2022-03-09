import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from './../utils/global';
import LoginButton from './../components/button/LoginButton';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import PhoneNumberInput from './../components/atoms/CustomContainer';
import {Formik} from 'formik';
import MultiSelect from 'react-native-multiple-select';
import {
  fetchCityAction,
  fetchStateAction,
  resetProfileStateAction,
  updateProfileAction,
} from '../redux/actions/editProfile';
import CalendarPicker from '../components/picker/CalendarPicker';
import moment from 'moment';
import {genderData} from '../utils/helper';
import SuccessAlert from '../components/molecules/alert/SuccessAlert';

const EditProfile = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {statesList, cityList, isUpdating, profileUpdateSuccess} = useSelector(
    ({editProfileReducer}) => editProfileReducer,
  );

  const {userDetails} = route.params;

  const [ProfilePic, setProfilePic] = useState(null);

  const handleSuccessOkayButton = () => {
    navigation.goBack();
    dispatch(resetProfileStateAction());
  };

  useEffect(() => {
    dispatch(fetchStateAction({countryCode: 101}));
    dispatch(fetchCityAction([userDetails.state_id]));
  }, []);

  const handleSubmit = async values => {
    const payload = {
      name: values.name,
      email: values.email,
      address: values.address,
      mobileno: values.mobileno,
      state_id: values.state[0],
      city_id: values.city[0],
      user_currency: 'INR',
      pincode: values.postalCode,
      dob: moment(values.dob.dateString).format('DD-MM-YYYY'),
      gender: values.gender[0],
      type: 1,
    };

    dispatch(updateProfileAction(payload));
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
      {console.log('userDetails==>', userDetails)}

      <Formik
        initialValues={{
          email: userDetails.email,
          name: userDetails.name,
          mobileno: userDetails.mobileno,
          address: userDetails.address,
          state: [userDetails.state_id],
          city: [userDetails.city_id],
          dob: {
            dateString: userDetails.dob
              ? userDetails.dob
              : moment().format('YYYY-MM-DD'),
          },
          gender: [userDetails.gender],
          postalCode: userDetails.pincode,
        }}
        onSubmit={values => handleSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
          <View>
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
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  title={'Email'}
                  placeholder={userDetails.email}
                  editable={false}
                />
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <CustomInputWithTitle
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                title={'Name'}
                placeholder={'Edit name'}
              />

              <PhoneNumberInput
                onChangeText={handleChange('mobileno')}
                onBlur={handleBlur('mobileno')}
                value={values.mobileno}
                title={'Mobile number'}
                placeholder={'Enter mobile number'}
                editable={false}
              />

              <CustomInputWithTitle
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                title={'Address'}
                placeholder={'Enter address'}
              />
              <View>
                <Text style={styles.title}> Select state</Text>

                <MultiSelect
                  hideTags
                  items={statesList}
                  uniqueKey="id"
                  displayKey="name"
                  single
                  //  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={value => {
                    setFieldValue('state', value);
                    dispatch(fetchCityAction(value));
                  }}
                  selectedItems={values.state}
                  selectText="  Pick State"
                  searchInputPlaceholderText=" Search Items..."
                  onChangeInput={text => console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="white"
                  selectedItemIconColor="white"
                  itemTextColor="#000"
                  searchInputStyle={styles.brandSearchInputStyle}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  styleListContainer={styles.listContainer}
                  styleDropdownMenu={styles.dropdownMenu}
                  styleDropdownMenuSubsection={styles.dropdownMenusubsection}
                  styleInputGroup={styles.inputGroup}
                  styleItemsContainer={styles.itemContainer}
                  styleSelectorContainer={styles.selectorContainer}
                  styleRowList={styles.rowList}
                />
              </View>

              <View>
                <Text style={styles.titleCity}> Select city</Text>
                <MultiSelect
                  hideTags
                  items={cityList}
                  uniqueKey="id"
                  displayKey="name"
                  single
                  //  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={value => setFieldValue('city', value)}
                  selectedItems={values.city}
                  selectText="  Pick City"
                  styleDropdownMenuSubsection={styles.citydropdoenSubSection}
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  styleListContainer={{height: 100}}
                  tagTextColor="#CCC"
                  selectedItemTextColor="white"
                  selectedItemIconColor="white"
                  itemTextColor="#000"
                  searchInputStyle={styles.brandSearchInputStyle}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  styleInputGroup={styles.inputGroup}
                  styleItemsContainer={styles.itemContainer}
                  styleRowList={styles.rowList}
                />
              </View>

              <CalendarPicker
                title={'Select date'}
                value={values.dob}
                onSelect={value => setFieldValue('dob', value)}
                //   minDate={new Date().toISOString().slice(0, 10)}
                //   loading={loading}
                placeholder={'Choose Date'}
              />

              <View>
                <Text style={styles.titleCity}> Select gender</Text>
                <MultiSelect
                  hideTags
                  items={genderData}
                  uniqueKey="id"
                  displayKey="name"
                  single
                  //  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={value =>
                    setFieldValue('gender', value)
                  }
                  selectedItems={values.gender}
                  selectText="  Pick Gender"
                  styleDropdownMenuSubsection={styles.genderdropDownMenuSection}
                  styleInputGroup={styles.inputGroup}
                  styleItemsContainer={styles.itemContainer}
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="white"
                  selectedItemIconColor="white"
                  itemTextColor="#000"
                  searchInputStyle={styles.brandSearchInputStyle}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  styleRowList={styles.rowList}
                />
              </View>
              <CustomInputWithTitle
                title={'Postal code'}
                placeholder={'Enter postal code'}
                value={values.postalCode}
                onChangeText={handleChange('postalCode')}
                keyboardType="numeric"
              />

              <View style={{marginBottom: 20, marginTop: 10}}>
                <LoginButton
                  title={'Update'}
                  onPress={handleSubmit}
                  loading={isUpdating}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
      <SuccessAlert
        visible={profileUpdateSuccess}
        message={'profile successfully updated'}
        onPressOkay={handleSuccessOkayButton}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  citydropdoenSubSection: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2BBBA0',
    height: 50,
    marginTop: 20,
  },
  rowList: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
  },
  genderdropDownMenuSection: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2BBBA0',
    height: 50,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#2BBBA0',
  },
  dropdown: {
    backgroundColor: 'red',
  },
  selectorContainer: {
    marginHorizontal: 10,
    marginTop: 10,
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
  dropdownMenusubsection: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2BBBA0',
    overflow: 'hidden',
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownMenu: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#20232a',
    height: 50,
  },

  title: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 12,
  },
  titleCity: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleGender: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 12,
  },
  h2: {
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    height: 256,
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: '#2BBBA0',
    marginTop: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2BBBA0',
  },
  brandSearchInputStyle: {
    height: 45,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  filtersContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  statusContainer: {
    zIndex: 99,
  },
});
