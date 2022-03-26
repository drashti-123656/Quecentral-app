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
import {COLORS} from '../../utils/theme';
import {Calendar} from 'react-native-calendars';
import EStyleSheet from 'react-native-extended-stylesheet';
import {dateOfWeekDays} from '../../utils/helper';
import moment from 'moment'

const CalendarPicker = props => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().format("DD/MM/YYYY"));

  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>

      {props.loading ? (
        <TouchableOpacity style={styles.input}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </TouchableOpacity>
      ) : props.value.dateString ? (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModal(true)}>
          <Text>{props.value.dateString}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModal(true)}>
          <Text style={{color: '#a1a1a1'}}>{props.placeholder}</Text>
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
              backgroundColor: '#000',
              position: 'absolute',
            }}></Pressable>
          <View style={styles.modalCont}>
            <Calendar
              onDayPress={day => {
                props.onSelect(day);
                setShowModal(false);
              }}
              markedDates={dateOfWeekDays(props.markedDays, selectedMonth)}
              minDate={props.minDate}
              onMonthChange={month => {
                setSelectedMonth(moment(month.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY'))
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarPicker;

const styles = EStyleSheet.create({
  h1: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 15,
    color: '$TEXT',
  },
  modalCont: {
    padding: 10,
    flex: 0.5,
    marginHorizontal: 20,
    backgroundColor: '$GRAY',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '$PRIMARY',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  h1: {
    color: '$TEXT',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    color: '$TEXT',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    borderBottomColor: '$ALPHA_TEXT',
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '$PRIMARY',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '$CARD_BACKGROUND',
  },
});
