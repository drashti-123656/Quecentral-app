import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import LoginButton from './../components/button/LoginButton';
import {bookService as bookServiceAPI} from './../services/api';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TimePicker from './../components/picker/TimePicker';
import CalendarPicker from './../components/picker/CalendarPicker';
import {COLORS} from './../utils/theme';

import {availability as availabilityAPI} from './../services/api';
import {serviceAvailability as serviceAvailabilityAPI} from './../services/api';



const BookService = props => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});
  const [availabilityData, setavailabilityData] = useState({});

  const [DateError,  setDateError] = useState('')

  const {service_amount} = props.route.params;

  useEffect(() => {
    fetchAvailablity();
  }, []);

  const submitHandler = async () => {
    setLoading(true);

    let formData = new URLSearchParams({
      from_time: '14:00:00',
      to_time: '15:00:00',
      service_date: '2021-07-30',
      service_id: '1',
      latitude: '19.0759837',
      location: '72.8776559',
      location: 'bilaspur',
      notes: notes,
      amount: service_amount,
    });
    const response = await bookServiceAPI(formData);
    if (response.data.response.response_code == 200) {
      showMessage({
        message: response.data.response.response_message,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
    } else {
      showMessage({
        message: response.data.response.response_message,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
    }

    setLoading(false);
  };

  const handleDateSelect = async (day) => {

    const formData = new URLSearchParams({
      service_id:67,
      date: day.dateString
    })
    const response = await serviceAvailabilityAPI(formData)

    if(response.data.response.response_code == 200){
      setTimeSlots(response.data.data.service_availability)
      setDateError('')
      setSelectedDay(day)
      setEnableTimeSlot(true)
    }else{
      setDateError(response.data.response.response_message)
      setEnableTimeSlot(false)
    }

  };

  const fetchAvailablity = async () => {
    const response = await availabilityAPI();
    setavailabilityData(response.data.data);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={{marginVertical: 10}}>
        <CustomInputWithTitle
          title={'Service Location'}
          placeholder={'Service Location'}
          editable={false}
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

          />
             {(DateError !== '') &&<Text style={{color: COLORS.warningRed}}>{DateError}</Text>}
        </View>
    { enableTimeSlot &&  <View style={{flex: 1, marginLeft: 5}}>
          <TimePicker
            title={'Time slot'}
            placeholder={'Time slot'}
            value={'12:00 - 3:00'}
            onSelect={setSelectedTime}
            timeSlots={timeSlots}
            selectedDay={selectedDay}
          />
        </View>}
      </View>

      {/* <RegionPicker
          title={'states'}
          mode={'states'}
          value={State}
          onSelect={setState}
          queryString={101}
        /> */}

      <CustomInputWithTitle
        title={'Notes '}
        placeholder={'Time slot'}
        editable={true}
        onChangeText={setNotes}
        multiline={true}
        height={150}
      />

<CustomInputWithTitle
        title={'Coupon'}
        placeholder={'Coupon'}
        editable={true}
      />

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
    backgroundColor:'#fff'
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
