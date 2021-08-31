import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {stateList as stateListAPI} from './../../services/api';
import { COLORS } from './../../utils/theme'

const Picker = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await stateListAPI();
    setModalData(response.data.data);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text>Choose Country</Text>
      </TouchableOpacity>

      <Modal animationType="fade" visible={showModal} transparent={true}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: '100%',
              width: '100%',
              opacity: 0.9,
              backgroundColor: '#000',
              position: 'absolute',
            }}></View>
          <View style={styles.modalCont}>
              <ScrollView>
            {modalData.map(item => (
              <Text style={styles.h2}>
                {item.name}
              </Text>
              
            ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  h1: {
    padding: 10,
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
    padding:10,
    borderBottomColor:'#d1d1d1',
    borderBottomWidth:1
  },
});
