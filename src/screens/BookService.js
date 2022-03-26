import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  CustomInputWithTitle,
  CouponInputWithTitle,
} from './../components/input/CustomInput';
import LoginButton from './../components/button/LoginButton';
import {SmallGenralButton} from './../components/button/GeneralButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TimePicker from './../components/picker/TimePicker';
import CalendarPicker from './../components/picker/CalendarPicker';
import {COLORS} from './../utils/theme';
import SuccessAlertModal from '../components/model/SuccessAlertModal';
import CheckBox from '@react-native-community/checkbox';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {
  serviceAvailability as serviceAvailabilityAPI,
  validateCoupon as validateCouponAPI,
} from './../services/api';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {bookServiceAction} from '../redux/actions/bookings';
import moment from 'moment';

const BookService = props => {
  const dispatch = useDispatch();
  const {availableDays} = useSelector(({serviceDetails}) => serviceDetails);

  const {service_amount, serviceId} = props.route.params;

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookinLoading, setBookinLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    alertDisplay: false,
    message: '',
    bookingStatus: false,
  });

  const [serviceLocation, setServiceLocation] = useState('');
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState({
    placeholder: 'Choose time',
  });
  const [DateError, setDateError] = useState('');

  const [coupon, setCoupon] = useState('');
  const [couponDetails, setCouponDetails] = useState({});
  const [couponError, setCouponError] = useState('');
  const [amount, setAmount] = useState('');
  const [openOthers, setOpenOthers] = useState(false);
  const [othersName, setOthersName] = useState('');
  const [othersNo, setOthersNo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format('DD/MM/YYYY'),
  );

  useEffect(() => {
    setAmount(service_amount);
  }, []);

  const submitHandler = async () => {
    setBookinLoading(true);

    if (selectedDay.dateString === undefined) {
      setDateError('Please select date');
      setBookinLoading(false);
      return;
    }

    if (openOthers === true) {
      if (othersName == '' || othersNo == '') {
        showMessage({
          message: 'Others name or mobile number can not be empty',
          type: 'info',
          backgroundColor: COLORS.warningRed,
        });
      }
      setBookinLoading(false);
      return;
    }

    let formData = new URLSearchParams({
      from_time: selectedTime.start_time ? selectedTime.start_time : null,
      to_time: selectedTime.end_time ? selectedTime.end_time : null,
      service_date: selectedDay.dateString,
      service_id: serviceId,
      latitude: '19.0759837',
      longitude: '72.8776559',
      location: serviceLocation,
      notes: notes,
      amount: service_amount,
      coupon_id: couponDetails.id,
      type: openOthers ? 'others' : 'self',
      other_user_name: othersName,
      other_user_contact: othersNo,
    });

    const payload = {
      from_time: selectedTime.start_time ? selectedTime.start_time : null,
      to_time: selectedTime.end_time ? selectedTime.end_time : null,
      service_date: selectedDay.dateString,
      service_id: serviceId,
      latitude: '19.0759837',
      longitude: '72.8776559',
      location: serviceLocation,
      notes: notes,
      amount: service_amount,
      coupon_id: couponDetails.id,
      type: openOthers ? 'others' : 'self',
      other_user_name: othersName,
      other_user_contact: othersNo,
    };

    dispatch(bookServiceAction(payload));

    setBookinLoading(false);
  };

  const handleDateSelect = async day => {
    setLoading(true);
    const formData = new URLSearchParams({
      service_id: serviceId,
      date: day.dateString,
    });
    const response = await serviceAvailabilityAPI(formData);

    if (
      response.data.response.response_code == 200 &&
      Object.keys(response.data.data).length !== 0
    ) {
      setTimeSlots(response.data.data.service_availability);
      setDateError('');
      setSelectedDay(day);
      setEnableTimeSlot(true);
    } else if (
      response.data.response.response_code == 200 &&
      Object.keys(response.data.data).length === 0
    ) {
      setDateError('');
      setSelectedDay(day);
    } else {
      setDateError(response.data.response.response_message);
      setEnableTimeSlot(false);
    }
    setLoading(false);
  };

  const validateCoupon = async () => {
    if (coupon === '') {
      setCouponError('Enter coupon name');
      return;
    }
    let formData = new URLSearchParams({
      coupon_code: coupon,
    });
    const response = await validateCouponAPI(formData);

    if (response.data.response.response_code == 200) {
      setCouponDetails(response.data.data[0]);
      setAmount(
        JSON.stringify(
          (service_amount * (100 - response.data.data[0].discount)) / 100,
        ),
      );
      setCouponError('couponISAvailable');
    } else {
      setAmount(service_amount);
      setCouponError(response.data.response.response_message);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SuccessAlertModal
        value={alertData}
        text={alertData.message}
        onPressOkay={setAlertData}
      />
      {/* <View style={{marginVertical: 10}}>
        <CustomInputWithTitle
          title={'Service Location'}
          placeholder={'Service Location'}
          value={serviceLocation}
          onChangeText={setServiceLocation}
        />
      </View> */}

      <View style={styles.rowCont}>
        <View style={{flex: 1, marginRight: 5}}>
          <CalendarPicker
            title={'Select date'}
            value={selectedDay}
            onSelect={handleDateSelect}
            minDate={new Date().toISOString().slice(0, 10)}
            loading={loading}
            placeholder={'Choose Date'}
            markedDays={availableDays}
            setSelectedMonth={setSelectedMonth}
            selectedMonth={selectedMonth}
          />
          {DateError !== '' && (
            <Text style={{color: COLORS.warningRed}}>{DateError}</Text>
          )}
        </View>
        {enableTimeSlot && (
          <View style={{flex: 1, marginLeft: 5}}>
            <TimePicker
              title={'Time slot'}
              placeholder={'Time slot'}
              value={selectedTime}
              onSelect={setSelectedTime}
              timeSlots={timeSlots}
              selectedDay={selectedDay}
            />
          </View>
        )}
      </View>

      <View style={styles.rowCont}>
        <View style={{width: '49%'}}>
          <CustomInputWithTitle
            title={'Service amount'}
            placeholder={'Service amount'}
            value={amount}
            editable={false}
          />
        </View>
        <View style={{width: '49%'}}>
          <CouponInputWithTitle
            title={'Enter coupon'}
            placeholder={'Coupon'}
            editable={true}
            onChangeText={setCoupon}
            value={coupon}
            couponError={couponError}
          />
        </View>
      </View>

      <View style={styles.rowCont}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {couponError !== '' && couponError !== 'couponISAvailable' && (
            <Text style={{color: COLORS.warningRed}}>{couponError}</Text>
          )}
        </View>

        <View style={{marginLeft: 'auto'}}>
          <SmallGenralButton title={'Apply'} onPress={validateCoupon} />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <CheckBox
          disabled={false}
          value={openOthers}
          onValueChange={newValue => setOpenOthers(newValue)}
          tintColors={{true: COLORS.PRIMARY, false: COLORS.PRIMARY}}
          tintColor={COLORS.PRIMARY} // for IOS
          boxType={'square'} // for IOS
          onCheckColor={COLORS.PRIMARY}
          onTintColor={COLORS.PRIMARY}
        />
        <Text style={styles.TermsCondition}>Book for other</Text>
      </View>

      {openOthers && (
        <View>
          <View style={{marginVertical: 10}}>
            <CustomInputWithTitle
              title={'Name'}
              placeholder={'Name'}
              value={othersName}
              onChangeText={setOthersName}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <CustomInputWithTitle
              title={'Phone Number'}
              placeholder={'Phone number'}
              value={othersNo}
              keyboardType="numeric"
              onChangeText={setOthersNo}
              maxLength={10}
            />
          </View>
        </View>
      )}

      <CustomInputWithTitle
        title={'Notes'}
        placeholder={'Notes'}
        editable={true}
        onChangeText={setNotes}
        multiline={true}
        height={150}
      />

      <View
        style={{
          marginVertical: 20,
        }}>
        <LoginButton
          title={'Continue To Book'}
          loading={bookinLoading}
          onPress={() => submitHandler()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BookService;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '$BACKGROUND',
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  TermsCondition: {
    color: '$TEXT',
  },
});
