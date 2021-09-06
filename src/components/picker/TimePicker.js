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
import {COLORS} from '../../utils/theme';

const timeSlots = [
  {from: '00:00 AM', to: '01:00 AM'},
  {from: '01:00 AM', to: '02:00 AM'},
  {from: '02:00 AM', to: '03:00 AM'},
  {from: '03:00 AM', to: '04:00 AM'},
  {from: '04:00 AM', to: '05:00 AM'},
  {from: '05:00 AM', to: '06:00 AM'},
  {from: '06:00 AM', to: '07:00 AM'},
  {from: '07:00 AM', to: '08:00 AM'},
  {from: '08:00 AM', to: '09:00 AM'},
  {from: '09:00 AM', to: '10:00 AM'},
  {from: '10:00 AM', to: '11:00 AM'},
  {from: '11:00 AM', to: '12:00 PM'},
  {from: '12:00 PM', to: '13:00 PM'},
  {from: '13:00 PM', to: '14:00 PM'},
  {from: '14:00 PM', to: '15:00 PM'},
  {from: '15:00 PM', to: '16:00 PM'},
  {from: '16:00 PM', to: '17:00 PM'},
  {from: '17:00 PM', to: '18:00 PM'},
  {from: '18:00 PM', to: '19:00 PM'},
  {from: '19:00 PM', to: '20:00 PM'},
  {from: '20:00 PM', to: '21:00 PM'},
  {from: '21:00 PM', to: '22:00 PM'},
  {from: '22:00 PM', to: '23:00 PM'},
  {from: '23:00 PM', to: '24:00 PM'},
 
];

const TimePicker = ({title, onSelect, value}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(timeSlots);

  useEffect(() => {
  //  fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    const response = await availabilityAPI();
    console.log(response);
    // onSelect(response.data.data.category_list.find((item) => item.id === value.id))
  };

  const handleSelect = item => {
    onSelect(item);
    setShowModal(false);
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
        <Text>{value}</Text>
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
              <Text
                onPress={() => handleSelect({category_name: 'All'})}
                style={{...styles.h2, textAlign:'center'}}>
                All
              </Text>
              {modalData.map((item, id) => (
                <Text
                  key={id}
                  onPress={() => handleSelect(item)}
                  style={{...styles.h2, textAlign:'center'}}>
                  {item.from} - {item.to}
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
