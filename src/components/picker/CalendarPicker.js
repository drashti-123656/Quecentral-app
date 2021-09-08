import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {categoryList as categoryListAPI} from '../../services/api';
import {COLORS} from '../../utils/theme';
import {Calendar} from 'react-native-calendars';
import {date} from 'yup';
import serviceAvailability from './../../services/api';

const CalendarPicker = props => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, []);

  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>

      {props.loading ? (
        <TouchableOpacity style={styles.input}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModal(true)}>
          <Text>{props.value.dateString}</Text>
        </TouchableOpacity>
      )}

      <Modal animationType="fade" visible={showModal} transparent={true}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Pressable
            onPress={() => setShowModal(false)}
            style={{
              height: '100%',
              width: '100%',
              opacity: 0.7,
              backgroundColor: '#333',
              position: 'absolute',
            }}></Pressable>
          <View style={styles.modalCont}>
            <Calendar
              onDayPress={day => {
                props.onSelect(day);
                setShowModal(false);
              }}
              minDate={props.minDate}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarPicker;

const styles = StyleSheet.create({
  h1: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
  },
  modalCont: {
    padding: 10,
    flex: 0.5,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  h1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2BBBA0',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
