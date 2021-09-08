import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  CustomInputWithTitle,
  CouponInputWithTitle,
} from './../components/input/CustomInput';
import LoginButton from './../components/button/LoginButton';
import {SmallGenralButton} from './../components/button/GeneralButton';
import {bookService as bookServiceAPI} from './../services/api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TimePicker from './../components/picker/TimePicker';
import CalendarPicker from './../components/picker/CalendarPicker';
import {COLORS} from './../utils/theme';
import SuccessAlertModal from '../components/model/SuccessAlertModal';

import {
  serviceAvailability as serviceAvailabilityAPI,
  validateCoupon as validateCouponAPI,
} from './../services/api';

const BookService = props => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    alertDisplay: false,
    message: '',
    bookingStatus: false,
  });

  const [serviceLocation, setServiceLocation] = useState('');
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});
  const [DateError, setDateError] = useState('');

  const [coupon, setCoupon] = useState('');
  const [couponDetails, setCouponDetails] = useState({});
  const [couponError, setCouponError] = useState('');

  const {service_amount} = props.route.params;

  useEffect(() => {}, []);

  const submitHandler = async () => {
    setLoading(true);

    let formData = new URLSearchParams({
      from_time: selectedTime.start_time ? selectedTime.start_time : null,
      to_time: selectedTime.end_time ? selectedTime.end_time : null,
      service_date: selectedDay.dateString,
      service_id: '1',
      latitude: '19.0759837',
      longitude: '72.8776559',
      location: 'bilaspur',
      notes: notes,
      amount: service_amount,
    });

    const response = await bookServiceAPI(formData);

    if (response.data.response.response_code == 200) {
      setAlertData({
        alertDisplay: true,
        message: response.data.response.response_message,
        bookingStatus: true,
      });
    } else {
      setAlertData({
        alertDisplay: true,
        message: response.data.response.response_message,
        bookingStatus: false,
      });
    }

    setLoading(false);
  };

  const handleDateSelect = async day => {
    setLoading(true);
    const formData = new URLSearchParams({
      service_id: 71,
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

  const validateCoupon = async (text) => {
    console.log(text)
    let formData = new URLSearchParams({
      coupon_code: text,
    });
    const response = await validateCouponAPI(formData);

    if (response.data.response.response_code == 200) {
      setCouponDetails(response.data.data[0]);
      setCouponError('couponISAvailable');
    } else {
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
      <View style={{marginVertical: 10}}>
        <CustomInputWithTitle
          title={'Service Location'}
          placeholder={'Service Location'}
          value={serviceLocation}
          onChangeText={setServiceLocation}
        />
      </View>
      <View style={{marginBottom: 10}}>
        <CustomInputWithTitle
          title={'Service amount'}
          placeholder={'Service amount'}
          value={service_amount}
          editable={false}
        />
      </View>
      <View style={styles.rowCont}>
        <View style={{flex: 1, marginRight: 5}}>
          <CalendarPicker
            title={'Select date'}
            value={selectedDay}
            onSelect={handleDateSelect}
            minDate={new Date().toISOString().slice(0, 10)}
            loading={loading}
            placeholder={'Choose Date'}
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

      <CustomInputWithTitle
        title={'Notes '}
        placeholder={'Time slot'}
        editable={true}
        onChangeText={setNotes}
        multiline={true}
        height={150}
      />

      <View style={{marginTop: 10}}>
        <CouponInputWithTitle
          title={'Enter coupon'}
          placeholder={'Coupon'}
          editable={true}
          onChangeText={text => {
            setCoupon(text);
            validateCoupon(text);
          }}
          value={coupon}
          couponError={couponError}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {couponError !== '' && couponError !== 'couponISAvailable' && (
            <Text style={{color: COLORS.warningRed}}>{couponError}</Text>
          )}
          <View style={{marginLeft: 'auto'}}>
            <SmallGenralButton title={'Apply'} onPress={validateCoupon} />
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <LoginButton
          title={'Continue To Book'}
          loading={loading}
          onPress={() => submitHandler()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BookService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
