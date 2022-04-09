import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import {availability as availabilityAPI} from '../../services/api';
import {hoursSplitter} from '../../utils/helper';

const TimePicker = props => {
  const [showModal, setShowModal] = useState(false);

  const handleSelect = item => {
    props.onSelect(item);
    setShowModal(false);
  };

  return (
    <View style={styles.timeslot}>
      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
        <Text style={styles.slot}>
          {props.value.start_time !== undefined
            ? `${props.value.start_time} - ${props.value.end_time}`
            : 'Choose time'}
        </Text>
      </TouchableOpacity>

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
            <ScrollView>
              {/* <Text
                onPress={() => handleSelect({category_name: 'All'})}
                style={{...styles.h2, textAlign:'center'}}>
                All
              </Text> */}
              {props.timeSlots.map((item, id) => (
                <Text
                  key={id}
                  onPress={() => handleSelect(item)}
                  style={{...styles.h2, textAlign: 'center'}}>
                  {item.start_time} - {item.end_time}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  timeslot:{
    marginTop: 15,
  },
  h1: {
    padding: 10,
  },
  slot: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: 'white',
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
