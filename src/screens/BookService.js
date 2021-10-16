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
  const [selectedTime, setSelectedTime] = useState({placeholder:'Choose time'});
  const [DateError, setDateError] = useState('');

  const [coupon, setCoupon] = useState('');
  const [couponDetails, setCouponDetails] = useState({});
  const [couponError, setCouponError] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setAmount(service_amount);
  }, []);

  const submitHandler = async () => {
    setBookinLoading(true);

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
      coupon_id:couponDetails.id
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
    if(coupon ===''){
      setCouponError('Enter coupon name');
      return;
    }
    let formData = new URLSearchParams({
      coupon_code: coupon,
    });
    const response = await validateCouponAPI(formData);

    if (response.data.response.response_code == 200) {
      setCouponDetails(response.data.data[0]);
      setAmount(JSON.stringify((service_amount*(100-response.data.data[0].discount))/100))
      setCouponError('couponISAvailable');
    } else {
      setAmount(service_amount)
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
