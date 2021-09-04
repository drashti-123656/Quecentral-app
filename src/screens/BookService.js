import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomInputWithTitle} from './../components/input/CustomInput';
import LoginButton from './../components/button/LoginButton';
import {bookService as bookServiceAPI} from './../services/api';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {COLORS} from './../utils/theme'

const BookService = (props) => {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

    const {service_amount} = props.route.params;  


  const submitHandler = async () => {
    setLoading(true)

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
    }else{
        showMessage({
            message: response.data.response.response_message,
            type: 'info',
            backgroundColor: COLORS.warningRed,
          });
    }

    setLoading(false)
  };

  return (
    <View style={styles.container}>
      <CustomInputWithTitle
        title={'Service Location'}
        placeholder={'Service Location'}
        editable={false}
      />
      <CustomInputWithTitle
        title={'Service amount'}
        placeholder={'Service amount'}
        value={service_amount}
        editable={false}
      />

      <View style={styles.rowCont}>
        <View style={{width: '49%'}}>
          <CustomInputWithTitle
            title={'Date'}
            placeholder={'Time slot'}
            editable={false}
          />
        </View>
        <View style={{width: '49%'}}>
          <CustomInputWithTitle
            title={'Time slot'}
            placeholder={'Time slot'}
            editable={false}
          />
        </View>
      </View>

      <CustomInputWithTitle
        title={'Notes '}
        placeholder={'Time slot'}
        editable={true}
        onChangeText={setNotes}
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
    </View>
  );
};

export default BookService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
